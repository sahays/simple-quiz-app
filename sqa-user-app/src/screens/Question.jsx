import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import Choices from "./Choices";

const Question = ({
  question,
  choices,
  type,
  onNext,
  onPrevios,
  visible,
  canSubmit,
  onSubmit,
}) => {
  const nextOrSubmit = () => {
    if (canSubmit) {
      return (
        <Button className="float-right" onClick={onSubmit}>
          Finish and Submit
        </Button>
      );
    }
    return (
      <Button className="float-right" onClick={onNext}>
        Next
      </Button>
    );
  };

  return (
    visible && (
      <Card>
        <Card.Body>
          <h3>{question}</h3>
          <Choices data={choices} type={type}></Choices>
        </Card.Body>
        <Card.Footer>
          {nextOrSubmit()}
          <Button variant="secondary" onClick={onPrevios}>
            Previous
          </Button>
        </Card.Footer>
      </Card>
    )
  );
};

export default Question;
