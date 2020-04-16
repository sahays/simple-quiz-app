import React, { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Question from "./Question";

const Quiz = () => {
  const [name, setName] = useState("Name of the quiz");
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [questions, setQuestions] = useState([
    {
      question: "where is hello world?",
      type: "radio",
      choices: [
        { id: "1", text: "one" },
        { id: "2", text: "two" },
      ],
    },
    {
      question: "what is hello world?",
      type: "checkbox",
      choices: [
        { id: "1", text: "one" },
        { id: "2", text: "two" },
        { id: "3", text: "two" },
        { id: "4", text: "two" },
      ],
    },
  ]);

  const onPrevios = () => {
    if (visibleIndex > 0) {
      setVisibleIndex(visibleIndex - 1);
    }
  };

  const onNext = () => {
    if (visibleIndex < questions.length - 1) {
      setVisibleIndex(visibleIndex + 1);
    }
  };

  const onSubmit = () => {};

  const renderQuestions = () => {
    return questions.map((q, index) => {
      console.log(index);
      return (
        <Question
          key={index}
          onPrevios={onPrevios}
          onNext={onNext}
          visible={visibleIndex === index}
          canSubmit={visibleIndex === questions.length - 1}
          onSubmit={onSubmit}
          question={q.question}
          choices={q.choices}
          type={q.type}></Question>
      );
    });
  };

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Header>{name}</Card.Header>
            <Card.Body>{renderQuestions()}</Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Quiz;
