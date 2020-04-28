import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Formik, Form } from "formik";
import ButtonBar from "../controls/ButtonBar";
import * as yup from "yup";
import GraphQlUtil from "../utils/GraphQlUtil";
import { getQuizByCode } from "../graphql/queries";
import FormikField from "../controls/FormikField";
import { useHistory } from "react-router-dom";

const QuizCode = () => {
  const history = useHistory();
  const { query } = GraphQlUtil();
  const initValue = {
    code: "",
  };
  const [initialValue] = useState(initValue);
  const [busy, setBusy] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [infoMsg, setInfoMsg] = useState(null);
  const [quizId, setQuizId] = useState(null);
  const [canNavigate, setCanNavigate] = useState(false);

  useEffect(() => {
    if (canNavigate) history.push("/quiz/" + quizId);
  }, [canNavigate, quizId, history]);

  const onSubmit = async (values) => {
    setBusy(true);
    setErrorMsg(null);
    setInfoMsg(null);
    try {
      const {
        data: {
          getQuizByCode: { items },
        },
      } = await query(getQuizByCode, {
        code: values.code,
      });
      if (items && items.length > 0 && items[0].code === values.code) {
        setQuizId(items[0].id);
        setCanNavigate(true);
      }
    } catch (e) {
      console.log(e);
      setErrorMsg("Invalid code");
    }
    setBusy(false);
  };

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
                    <small className="text-muted">
                      you'll recieve a quiz code from your instructors
                    </small>
                    <FormikField
                      as="input"
                      className="form form-control mb-3"
                      name="code"
                      placeholder="enter the quiz code"
                    />
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
