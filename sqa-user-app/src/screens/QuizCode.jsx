import React, { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Formik, Form } from "formik";
import TextField from "../controls/TextField";
import ButtonBar from "../controls/ButtonBar";
import * as yup from "yup";

const QuizCode = () => {
  const initValue = {
    code: "",
  };
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
            <Card.Header>Quiz code</Card.Header>
            <Card.Body>
              <Formik
                initialValues={initialValue}
                enableReinitialize={true}
                onSubmit={onSubmit}
                validationSchema={yup.object().shape({
                  code: yup.string().required().min(7).max(7),
                })}>
                {() => (
                  <Form>
                    <TextField name="code" placeholder="enter the quiz code" />
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

export default QuizCode;
