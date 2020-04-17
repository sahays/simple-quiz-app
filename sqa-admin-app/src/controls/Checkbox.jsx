import React from "react";
import { Field } from "formik";

const Checkbox = (props) => {
  return (
    <Field name={props.name}>
      {({}) => (
        <input
          type="checkbox"
          {...props}
          checked={props.checked}
          onChange={props.onChange}
        />
      )}
    </Field>
  );
};

export default Checkbox;
