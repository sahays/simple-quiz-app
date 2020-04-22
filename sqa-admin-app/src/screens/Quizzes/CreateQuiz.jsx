import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Formik, Form } from "formik";
import ButtonBar from "../../controls/ButtonBar";
import * as yup from "yup";

import GraphQlUtil from "../../utils/GraphQlUtil";
import { createQuiz } from "../../graphql/mutations";
import { omit as _omit } from "underscore";
import RandomUtil from "../../utils/RandomUtil";
import StringUtil from "../../utils/StringUtil";
import { AboutQuiz } from "./Quiz/AboutQuiz";
import { PickQuestions } from "./Quiz/PickQuestions";
import { QuestionStore } from "../../cache-stores/QuestionStore";

const CreateQuiz = () => {
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
  const { mutation } = GraphQlUtil();

  useEffect(() => {
    const { getAllQuestions } = QuestionStore();
    const load = async () => {
      const items = await getAllQuestions();
      const qq = [];
      items.map((item) => {
        return qq.push(_omit(item, ["answers", "owner"]));
      });
      console.log(qq);
      setQuestions(qq);
    };

    load();
  }, []);

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
                    <AboutQuiz />
                    <PickQuestions values={values} questions={questions} />
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
