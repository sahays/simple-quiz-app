import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "@aws-amplify/ui/dist/style.css";

import { Route, Switch, BrowserRouter } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import Amplify from "aws-amplify";
import awsmobile from "./aws-exports";
import MainNavbar from "./screens/MainNavbar";
import Quiz from "./screens/Quiz";
import { Result } from "./screens/Result";
import { Signup } from "./screens/Signup";
import QuizCode from "./screens/QuizCode";

// Amplify.Logger.LOG_LEVEL = "DEBUG";
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
              <Route path="/quiz/:id" component={Quiz}></Route>
              <Route path="/result/:username/:id" component={Result}></Route>
              <Route path="/code" component={QuizCode}></Route>

              <Route path="/" component={Signup}></Route>
            </Switch>
          </Col>
          <Col sm={1}></Col>
        </Row>
      </Container>
    </BrowserRouter>
  );
};

export default App;
