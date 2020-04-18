import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";

import { Formik, Form, FieldArray } from "formik";
import ButtonBar from "../../controls/ButtonBar";
import * as yup from "yup";
import FormikField from "../../controls/FormikField";
import GraphQlUtil from "../../utils/GraphQlUtil";
import { listQuestions as ListQuestions } from "../../graphql/queries";
import Checkbox from "../../controls/Checkbox";
import { find as _find } from "underscore";

const CreateQuiz = () => {
  const charLimit = 200;
  const initValue = {
    name: "",
    tags: [],
    questions: [],
  };
  const [initialValue, setInitialValue] = useState(initValue);
  const [busy, setBusy] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [infoMsg, setInfoMsg] = useState(null);
  const [questions, setQuestions] = useState(null);
  const { query } = GraphQlUtil();

  useEffect(() => {
    const load = async () => {
      const {
        data: {
          listQuestions: { items },
        },
      } = await query(ListQuestions);
      console.log(items);
      setQuestions(items);
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

  const onSubmit = async (values) => {
    console.log(values);
  };

  const renderTags = (q) => {
    return q.tags.map((t, index) => {
      return (
        <Badge key={index} variant="info" className="mr-1">
          {t}
        </Badge>
      );
    });
  };

  const renderQuestions = (values, arrayHelpers) => {
    if (questions) {
      return questions.map((qq, index) => {
        return (
          <Row key={index}>
            <Col sm={1}>
              <Checkbox
                name={`questions[${index}].id`}
                value={qq.id}
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
              {renderTags(qq)}
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
                  name: yup
                    .string()
                    .required("A name is required")
                    .min(3, "At least 3 characters")
                    .max(255, "Max 255 characters"),
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
