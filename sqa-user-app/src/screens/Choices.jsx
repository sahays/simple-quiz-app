import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import { MarkdownViewer } from "../controls/MarkdownViewer";
import { find as _find } from "underscore";

const Choices = ({ data, type, name, responses, onChange }) => {
  const isChecked = (id) => {
    const found = _find(responses, (r) => {
      return r.questionId === id;
    });
    console.log(found);
    return found !== undefined;
  };

  if (!data) {
    return <p>No choices available</p>;
  }
  return data.map((d, index) => {
    return (
      <Row key={index}>
        <Col sm={1}>
          <Form.Check
            key={index}
            type={type}
            id={d.id}
            name={name}
            onChange={onChange}
            checked={isChecked(d.id)}></Form.Check>
        </Col>
        <Col>
          <MarkdownViewer source={d.text} />
        </Col>
      </Row>
    );
  });
};

export default Choices;
