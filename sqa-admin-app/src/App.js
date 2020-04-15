import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "@aws-amplify/ui/dist/style.css";

import Amplify from "aws-amplify";
import awsmobile from "./aws-exports";
import { withAuthenticator } from "aws-amplify-react";

awsmobile.clientMetadata = {
  app: "sqa-admin",
};

Amplify.configure(awsmobile);

function App() {
  return <h1>Hello, world</h1>;
}

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
      label: "Email address",
      key: "email",
      required: true,
      displayOrder: 1,
      type: "email",
    },
    {
      label: "Password",
      key: "password",
      required: true,
      displayOrder: 2,
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
