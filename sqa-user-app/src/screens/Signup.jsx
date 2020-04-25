import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Formik, Form } from "formik";
import ButtonBar from "../controls/ButtonBar";
import FormikField from "../controls/FormikField";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import { StorageUtil } from "../utils/StorageUtil";
import { Hub } from "@aws-amplify/core";

export const Signup = () => {
  const { createItem } = StorageUtil();
  const key = "userAttrs";
  const history = useHistory();
  const initValue = {
    firstName: "",
    lastName: "",
  };
  const [initialValue] = useState(initValue);
  const [busy, setBusy] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [infoMsg, setInfoMsg] = useState(null);
  const [canNavigate, setCanNavigate] = useState(false);

  useEffect(() => {
    if (canNavigate) {
      console.log("signup");
      Hub.dispatch("signup-channel", {
        message: "signed-up",
      });
      history.push("/code");
    }
  }, [canNavigate, history]);

  useEffect(() => {
    const { hasItem } = StorageUtil();
    if (hasItem(key)) {
      setCanNavigate(true);
    }
  }, [key, history]);

  const onSubmit = async (values) => {
    setBusy(true);
    setErrorMsg(null);
    setInfoMsg(null);
    try {
      createItem(key, values);
      setCanNavigate(true);
    } catch (e) {
      console.log(e);
    }
    setBusy(false);
  };

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Header>Signup</Card.Header>
            <Card.Body>
              <Formik
                initialValues={initialValue}
                enableReinitialize={true}
                onSubmit={onSubmit}
                validationSchema={yup.object().shape({
                  firstName: yup
                    .string()
                    .required("Your first name is required")
                    .min(2)
                    .max(128),
                  lastName: yup
                    .string()
                    .required("Your last name is required")
                    .min(2)
                    .max(128),
                })}>
                {() => (
                  <Form>
                    <FormikField
                      as="input"
                      className="form form-control mb-3"
                      name="firstName"
                      placeholder="enter your first name e.g. John"
                    />
                    <FormikField
                      as="input"
                      className="form form-control mb-3"
                      name="lastName"
                      placeholder="enter your last name e.g. Doe"
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
