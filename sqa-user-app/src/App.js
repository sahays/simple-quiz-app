import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "@aws-amplify/ui/dist/style.css";

import { Route, Switch, BrowserRouter } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import Amplify from "aws-amplify";
import awsmobile from "./aws-exports";
import { withAuthenticator } from "aws-amplify-react";
import MainNavbar from "./controls/MainNavbar";
import QuizCode from "./screens/QuizCode";
import Quiz from "./screens/Quiz";

Amplify.Logger.LOG_LEVEL = "DEBUG";
awsmobile.clientMetadata = {
  app: "sqa-user",
};
Amplify.configure(awsmobile);

const App = () => {
  return (
    <BrowserRouter>
      <MainNavbar></MainNavbar>
      <Container>
        <Row>
          <Col sm={1}></Col>
          <Col>
            <Switch>
              <Route path="/quiz/:quizId" component={Quiz}></Route>
              <Route path="/" component={QuizCode}></Route>
            </Switch>
          </Col>
          <Col sm={1}></Col>
        </Row>
      </Container>
    </BrowserRouter>
  );
};

const signUpConfig = {
  header: "Sign Up",
  hideAllDefaults: true,
  signUpFields: [
    {
      label: "Username",
      key: "username",
      required: true,
      displayOrder: 1,
      type: "string",
    },
    {
      label:
        "Email address (we'll send a code to this address for verification)",
      key: "email",
      required: true,
      displayOrder: 2,
      type: "email",
    },
    {
      label: "Password",
      key: "password",
      required: true,
      displayOrder: 3,
      type: "password",
    },
    {
      label: "First Name",
      key: "given_name",
      required: true,
      displayOrder: 4,
      type: "string",
    },
    {
      label: "Last Name",
      key: "family_name",
      required: true,
      displayOrder: 5,
      type: "string",
    },
  ],
};
// const usernameAttributes = "email";

export default withAuthenticator(App, { signUpConfig });
