import React from "react";
import { Field, ErrorMessage } from "formik";

const FormikField = (props) => {
  return (
    <div className="form-group">
      <Field {...props}></Field>
      <ErrorMessage
        className="alert alert-warning"
        role="alert"
        name={props.name}
        component="p"></ErrorMessage>
    </div>
  );
};

export default FormikField;
