import React from "react";
import { Field, ErrorMessage } from "formik";

const TextField = ({
  placeholder,
  name,
  disabled = false,
  type = "text",
  as = "input",
}) => {
  return (
    <div className="form-group">
      <Field
        type={type}
        as={as}
        disabled={disabled}
        name={name}
        style={{ marginBottom: 4 }}
        className="form-control"
        placeholder={placeholder}></Field>
      <ErrorMessage
        className="alert alert-warning"
        role="alert"
        name={name}
        component="p"></ErrorMessage>
    </div>
  );
};

export default TextField;
