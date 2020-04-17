import React, { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Formik, Form, FieldArray, Field } from "formik";
import ButtonBar from "../../controls/ButtonBar";
import * as yup from "yup";
import random from "../../utils/random";
import Checkbox from "../../controls/Checkbox";

const CreateQuestion = () => {
  const { defaultRandomAlpha } = random();
  const initValue = {
    question: "",
    type: "",
    choices: [{ id: defaultRandomAlpha(), text: "" }],
  };
  const [question, setQuestion] = useState(initValue);
  const [initialValue, setInitialValue] = useState(initValue);
  const [busy, setBusy] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [infoMsg, setInfoMsg] = useState(null);

  const onSubmit = () => {};

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
                  question: yup.string().required().min(10).max(1024),
                })}>
                {({ values }) => (
                  <Form>
                    <Field
                      name="question"
                      className="form form-control"
                      as="textarea"
                      rows="8"
                      placeholder="question markdown"
                    />
                    <FieldArray
                      name="choices"
                      render={(arrayHelpers) => {
                        return (
                          <div>
                            {values.choices.map((choice, index) => (
                              <Row key={index} className="mt-3">
                                <Col sm={1}>
                                  <Checkbox
                                    name={`choices[${index}].id`}
                                    value={choice.id}
                                    onChange={() => {}}
                                  />
                                </Col>
                                <Col>
                                  <Field
                                    as="textarea"
                                    rows="4"
                                    type="text"
                                    placeholder="choice markdown"
                                    className="form form-control"
                                    name={`choices.${index}.text`}
                                  />
                                </Col>
                                <Col sm={2}>
                                  <Button
                                    type="button"
                                    variant="light"
                                    className="float-right ml-1"
                                    size="sm"
                                    onClick={() =>
                                      arrayHelpers.push({
                                        id: defaultRandomAlpha(),
                                        text: "",
                                      })
                                    }>
                                    +
                                  </Button>
                                  <Button
                                    type="button"
                                    variant="light"
                                    className="float-right"
                                    size="sm"
                                    onClick={() => {
                                      if (index > 0) arrayHelpers.remove(index);
                                    }}>
                                    -
                                  </Button>
                                </Col>
                              </Row>
                            ))}
                          </div>
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
export default CreateQuestion;
