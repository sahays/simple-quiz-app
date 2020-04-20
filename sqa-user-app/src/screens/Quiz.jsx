import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Question from "./Question";
import { StorageUtil } from "../utils/StorageUtil";

const Quiz = ({ match }) => {
  const { readItem } = StorageUtil();
  const [quizId] = useState(match.params.id);
  const [quiz, setQuiz] = useState(null);
  const [name, setName] = useState(null);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [questions, setQuestions] = useState(null);

  useEffect(() => {
    const items = readItem(quizId);
    const item = items[0];
    console.log(item);
    setQuiz(item);
    setName(items.name);
    setQuestions(item.questions);
  }, [quizId]);

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
    if (!questions) {
      return <p>No questions loaded</p>;
    }
    return questions.map((q, index) => {
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
