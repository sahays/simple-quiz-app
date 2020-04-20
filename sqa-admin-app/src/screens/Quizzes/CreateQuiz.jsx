import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";

import { Formik, Form, FieldArray } from "formik";
import ButtonBar from "../../controls/ButtonBar";
import * as yup from "yup";
import FormikField from "../../controls/FormikField";
import GraphQlUtil from "../../utils/GraphQlUtil";
import { listQuestions as ListQuestions } from "../../graphql/queries";
import { createQuiz } from "../../graphql/mutations";
import Checkbox from "../../controls/Checkbox";
import { find as _find, omit as _omit } from "underscore";
import RandomUtil from "../../utils/RandomUtil";
import StringUtil from "../../utils/StringUtil";

const CreateQuiz = () => {
  const charLimit = 200;
  const { getRandomNumbers } = RandomUtil();
  const { trimSplit } = StringUtil();
  const initValue = {
    name: "",
    tags: "",
    code: getRandomNumbers(),
    description: "",
    instructions: "",
    questions: [],
  };
  const [initialValue] = useState(initValue);
  const [busy, setBusy] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [infoMsg, setInfoMsg] = useState(null);
  const [questions, setQuestions] = useState(null);
  const { query, mutation } = GraphQlUtil();

  useEffect(() => {
    const load = async () => {
      const {
        data: {
          listQuestions: { items },
        },
      } = await query(ListQuestions);
      const qq = [];
      items.map((item) => {
        return qq.push(_omit(item, ["answers", "owner"]));
      });
      console.log(qq);
      setQuestions(qq);
    };

    load();
  }, [query]);

  const renderQuestion = (q) => {
    return (
      <div>
        {q.length > charLimit
          ? `${q.substr(0, charLimit)}...`
          : `${q.substr(0, charLimit)}`}
      </div>
    );
  };

  const onSubmit = async (values, { resetForm }) => {
    setBusy(true);
    setInfoMsg(null);
    setErrorMsg(null);
    try {
      await mutation(createQuiz, {
        name: values.name,
        code: values.code,
        tags: trimSplit(values.tags),
        questions: values.questions,
      });
      setInfoMsg("New quiz added");
      resetForm();
    } catch (e) {
      console.log("error: ", e);
      setErrorMsg("Failed to add a new quiz");
    }
    setBusy(false);
  };

  const renderTags = (tags) => {
    return tags.map((t, index) => {
      return (
        <Badge key={index} variant="info" className="mr-1">
          {t}
        </Badge>
      );
    });
  };

  const isChecked = ({ qq, values }) => {
    const result = _find(values.questions, (q) => {
      return q.id === qq.id;
    });
    if (result) return true;
    return false;
  };

  const renderQuestions = (values, arrayHelpers) => {
    if (!questions) {
      return <p>Loading...</p>;
    }
    if (questions) {
      return questions.map((qq, index) => {
        return (
          <Row key={index}>
            <Col sm={1}>
              <Checkbox
                name={`questions[${index}].id`}
                value={qq.id}
                checked={isChecked({ qq, values })}
                onChange={(e) => {
                  if (e.target.checked) {
                    arrayHelpers.push(qq);
                  } else {
                    arrayHelpers.remove(
                      _find(values.questions, (q) => {
                        return q.id === qq.id;
                      })
                    );
                  }
                }}
              />
            </Col>
            <Col>
              {renderQuestion(qq.question)}
              {renderTags(qq.tags)}
            </Col>
          </Row>
        );
      });
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <span style={{ textTransform: "uppercase" }}>New Quiz</span>
            </Card.Header>
            <Card.Body>
              <Formik
                initialValues={initialValue}
                enableReinitialize={true}
                onSubmit={onSubmit}
                validationSchema={yup.object().shape({
                  code: yup
                    .string()
                    .required("A code is required")
                    .min(7, "At least 3 characters")
                    .max(7, "Max 7 characters"),
                  name: yup
                    .string()
                    .required("A name is required")
                    .min(3, "At least 3 characters")
                    .max(255, "Max 255 characters"),
                  description: yup
                    .string()
                    .required("description is required")
                    .min(5, "At least 5 characters")
                    .max(512, "Max 512 characters"),
                  instructions: yup
                    .string()
                    .min(5, "At least 3 characters")
                    .max(512, "Max 512 characters"),
                  tags: yup
                    .string()
                    .required("Tags are required")
                    .min(3, "At least 3 characters")
                    .max(256, "Max 256 characters"),
                  questions: yup
                    .array()
                    .of(
                      yup.object().shape({
                        id: yup.string().required(), // these constraints take precedence
                      })
                    )
                    .required("Please select a question"), // these constraints are shown if and only if inner constraints are satisfied
                })}>
                {({ values }) => (
                  <Form>
                    <small className="text-muted">
                      Share this code with students
                    </small>
                    <FormikField
                      name="code"
                      className="form form-control mb-3"
                      as="input"
                      disabled
                      placeholder="autogenerated code"
                    />
                    <small className="text-muted">
                      Tags are used as filters. Use comma separated tags e.g.
                      ec2, level100 etc.
                    </small>
                    <FormikField
                      name="tags"
                      className="form form-control mb-3"
                      as="input"
                      placeholder="comma separated tags"
                    />
                    <small className="text-muted">name of your quiz</small>
                    <FormikField
                      name="name"
                      className="form form-control mb-3"
                      as="input"
                      placeholder="name"
                    />
                    <small className="text-muted">
                      short description in{" "}
                      <a
                        href="https://www.markdownguide.org/cheat-sheet/"
                        rel="noopener noreferrer"
                        target="_blank">
                        markdown
                      </a>{" "}
                      or plain text
                    </small>
                    <FormikField
                      name="description"
                      className="form form-control mb-3"
                      as="textarea"
                      placeholder="description"
                    />
                    <small className="text-muted">
                      precise instructions in markdown or plain text
                    </small>
                    <FormikField
                      name="instructions"
                      className="form form-control mb-3"
                      as="textarea"
                      placeholder="instructions"
                    />
                    <small className="text-muted">pick questions</small>
                    <FieldArray
                      name="questions"
                      render={(arrayHelpers) => {
                        return (
                          <div>{renderQuestions(values, arrayHelpers)}</div>
                        );
                      }}></FieldArray>
                    <ButtonBar
                      busy={busy}
                      errorMsg={errorMsg}
                      infoMsg={infoMsg}
                    />
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default CreateQuiz;
