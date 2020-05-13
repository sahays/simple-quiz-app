import React, { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Formik, Form, FieldArray } from "formik";
import ButtonBar from "../../controls/ButtonBar";
import * as yup from "yup";
import RandomUtil from "../../utils/RandomUtil";
import Checkbox from "../../controls/Checkbox";
import { reject as _reject } from "underscore";
import FormikField from "../../controls/FormikField";
import StringUtil from "../../utils/StringUtil";
import { QuestionStore } from "../../cache-stores/QuestionStore";

const CreateQuestion = () => {
  const { getRandomAlphabets } = RandomUtil();
  const { trimSplit } = StringUtil();
  const initValue = {
    question: "",
    type: "",
    tags: [],
    explanation: "",
    choices: [{ id: getRandomAlphabets(), text: "" }],
  };
  const [answers, setAnswers] = useState([]);
  const [initialValue, setInitialValue] = useState(initValue);
  const [busy, setBusy] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [infoMsg, setInfoMsg] = useState(null);
  const [warnMsg, setWarnMsg] = useState(null);

  const onSubmit = async (values) => {
    setBusy(true);
    setInfoMsg(null);
    setErrorMsg(null);
    console.log(values);
    try {
      if (answers.length > 0) {
        const { createNewQuestion } = QuestionStore();
        const previousTags = values.tags.toLowerCase();
        await createNewQuestion({
          question: values.question,
          type: answers.length > 1 ? "checkbox" : "radio",
          choices: values.choices,
          answers: answers,
          explanation: values.explanation,
          timeLimit: values.timeLimit,
          tags: trimSplit(values.tags.toLowerCase()),
        });
        setInfoMsg("New question added");
        answers.length = 0;
        setAnswers(answers);
        setInitialValue({
          question: "",
          type: "",
          tags: previousTags,
          explanation: "",
          choices: [{ id: getRandomAlphabets(), text: "" }],
        });
      } else {
        setWarnMsg("You must pick an answer");
      }
    } catch (e) {
      console.log("error: ", e);
      setErrorMsg("Failed to add a new question");
    }
    setBusy(false);
  };

  const onChange = ({ target }) => {
    let ids = [...answers];
    if (target.checked) {
      ids.push(target.value);
    } else {
      ids = _reject(ids, (x) => x === target.value);
    }
    ids.sort();
    setAnswers(ids);
  };

  const markupHelptext = () => {
    return (
      <small>
        Use either{" "}
        <a
          href="https://www.markdownguide.org/cheat-sheet/"
          rel="noopener noreferrer"
          target="_blank">
          markdown
        </a>{" "}
        or plain text
      </small>
    );
  };

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <span style={{ textTransform: "uppercase" }}>New Question</span>
            </Card.Header>
            <Card.Body>
              <Formik
                initialValues={initialValue}
                enableReinitialize={true}
                onSubmit={onSubmit}
                validationSchema={yup.object().shape({
                  question: yup
                    .string()
                    .required("A question is required")
                    .min(10, "At least 10 characters")
                    .max(1024, "Max 1024 characters"),
                  explanation: yup
                    .string()
                    .required("An explanation is required")
                    .min(10, "At least 10 characters")
                    .max(1024, "Max 1024 characters"),
                  tags: yup
                    .string()
                    .required("Tags are required")
                    .min(3, "At least 3 characters")
                    .max(256, "Max 256 characters"),
                  choices: yup
                    .array()
                    .of(
                      yup.object().shape({
                        id: yup.string().required(), // these constraints take precedence
                        text: yup
                          .string()
                          .max(512, "Max 512 characters")
                          .required("Choice is required"), // these constraints take precedence
                      })
                    )
                    .required(), // these constraints are shown if and only if inner constraints are satisfied
                })}>
                {({ values }) => (
                  <Form>
                    <small>
                      Tags are used as filters. If you are adding an entry level
                      100 question related to EC2, you may want to use "EC2,
                      100"
                    </small>
                    <FormikField
                      name="tags"
                      className="form form-control mb-3"
                      as="input"
                      placeholder="comma separated tags"
                    />
                    {markupHelptext()}
                    <FormikField
                      name="question"
                      className="form form-control mb-3"
                      as="textarea"
                      rows="8"
                      placeholder="enter a question"
                    />
                    <FieldArray
                      name="choices"
                      render={(arrayHelpers) => {
                        return (
                          <div>
                            {values.choices.map((choice, index) => (
                              <Row key={index} className="mb-3">
                                <Col sm={1}>
                                  <Checkbox
                                    name={`choices[${index}].id`}
                                    className="mt-4"
                                    value={choice.id}
                                    checked={answers.indexOf(choice.id) > -1}
                                    onChange={onChange}
                                  />
                                </Col>
                                <Col>
                                  <small>
                                    Use checkbox to mark as answer; use +/- to
                                    add/remove choices. Use either markdown or
                                    plain text
                                  </small>
                                  <FormikField
                                    as="textarea"
                                    rows="4"
                                    type="text"
                                    placeholder="enter a choice"
                                    className="form form-control mb-3"
                                    name={`choices.${index}.text`}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <div className="mt-5">
                                    <Button
                                      type="button"
                                      variant="secondary"
                                      className="float-right ml-1"
                                      size="sm"
                                      onClick={() =>
                                        arrayHelpers.push({
                                          id: getRandomAlphabets(),
                                          text: "",
                                        })
                                      }>
                                      +
                                    </Button>
                                    <Button
                                      type="button"
                                      variant="secondary"
                                      className="float-right"
                                      size="sm"
                                      onClick={() => {
                                        if (index > 0)
                                          arrayHelpers.remove(index);
                                      }}>
                                      -
                                    </Button>
                                  </div>
                                </Col>
                              </Row>
                            ))}
                          </div>
                        );
                      }}></FieldArray>
                    {markupHelptext()}
                    <FormikField
                      name="explanation"
                      className="form form-control mb-3"
                      as="textarea"
                      rows="8"
                      placeholder="enter an explanation"
                    />
                    <ButtonBar
                      busy={busy}
                      errorMsg={errorMsg}
                      infoMsg={infoMsg}
                      warnMsg={warnMsg}
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
export default CreateQuestion;
