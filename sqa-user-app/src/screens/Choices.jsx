import React, { useState } from "react";
import { Form } from "react-bootstrap";

const Choices = ({ data, type }) => {
  if (!data) {
    return <p>No choices available</p>;
  }
  return data.map((d, index) => {
    return (
      <Form.Check key={index} type={type} id={d.id} label={d.text}></Form.Check>
    );
  });
};

export default Choices;
