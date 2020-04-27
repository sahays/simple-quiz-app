import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Alert,
  Badge,
} from "react-bootstrap";
import { Formik, Form, FieldArray } from "formik";
import ButtonBar from "../../controls/ButtonBar";
import * as yup from "yup";
import RandomUtil from "../../utils/RandomUtil";
import Checkbox from "../../controls/Checkbox";
import { reject as _reject, pluck, uniq, without } from "underscore";
import FormikField from "../../controls/FormikField";
import QuestionStore from "../../data-stores/QuestionStore";
import Predictions from "@aws-amplify/predictions";
import { Logger } from "aws-amplify";

const CreateQuestion = () => {
  const logger = new Logger("CreateQuestion");
  const { getRandomAlphabets } = RandomUtil();
  const initValue = {
    question: "",
    type: "",
    explanation: "",
    choices: [{ id: getRandomAlphabets(), text: "" }],
  };
  const [answers, setAnswers] = useState([]);
  const [initialValue, setInitialValue] = useState(initValue);
  const [busy, setBusy] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [infoMsg, setInfoMsg] = useState(null);
  const [warnMsg, setWarnMsg] = useState(null);
  const [sentiment, setSentiment] = useState(null);
  const [tags, setTags] = useState(null);

  const onSubmit = async (values) => {
    setBusy(true);
    setInfoMsg(null);
    setErrorMsg(null);
    console.log(values);
    try {
      if (answers.length > 0) {
        const { addNewQuestion } = QuestionStore();
        await addNewQuestion({
          question: values.question,
          type: answers.length > 1 ? "checkbox" : "radio",
          choices: values.choices,
          answers: answers,
          tags: tags,
          explanation: values.explanation,
        });
        // save tags
        setInfoMsg("New question added");
        answers.length = 0;
        setAnswers(answers);
        setInitialValue(initValue);
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

  const onFindTags = async ({ question, choices, explanation }) => {
    const text = pluck(choices, "text").join() + question + explanation;
    setBusy(true);
    try {
      const {
        textInterpretation: { sentiment, textEntities },
      } = await Predictions.interpret({
        text: {
          source: {
            text: text,
          },
          type: "ALL",
        },
      });
      setSentiment(sentiment.predominant);
      setTags(uniq(pluck(textEntities, "text")));
    } catch (e) {
      logger.error(e);
    }
    setBusy(false);
  };

  const renderSentiment = () => {
    if (sentiment === "NEGATIVE")
      return (
        <Alert variant="warning" size="sm" className="mt-2">
          You might want to change the question/choices/explanation because it
          shows a negative sentiment
        </Alert>
      );
  };

  const onRemoveTag = (tag) => {
    const t = [...tags];
    setTags(without(t, tag));
  };

  const renderTags = () => {
    if (tags && tags.length > 0) {
      return (
        <React.Fragment>
          <small>Click on a tag to remove</small>
          <Card className="mb-3">
            <Card.Body>
              {tags.map((t, index) => {
                return (
                  <Badge
                    key={index}
                    variant="dark"
                    className="mr-1 clickable"
                    onClick={() => onRemoveTag(t)}>
                    {t}
                  </Badge>
                );
              })}
            </Card.Body>
          </Card>
        </React.Fragment>
      );
    }
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
                    {markupHelptext()}
                    <FormikField
                      name="question"
                      className="form form-control mb-3"
                      as="textarea"
                      rows="8"
                      placeholder="enter a question"
                    />
                    <hr />
                    <FieldArray
                      name="choices"
                      render={(arrayHelpers) => {
                        return (
                          <div>
                            {values.choices.map((choice, index) => (
                              <Row key={index} className="mb-3">
                                <Col xs={1}>
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
                                <Col xs={2}>
                                  <div className="mt-4">
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
                    <hr />
                    {markupHelptext()}
                    <FormikField
                      name="explanation"
                      className="form form-control mb-3"
                      as="textarea"
                      rows="8"
                      placeholder="enter an explanation"
                    />
                    <hr />
                    {renderTags()}
                    {renderSentiment()}
                    <Row>
                      <Col>
                        <Button
                          size="sm"
                          onClick={() => onFindTags(values)}
                          className="float-right"
                          variant="success">
                          Find tags
                        </Button>
                      </Col>
                    </Row>
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
