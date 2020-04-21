import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { StorageUtil } from "../utils/StorageUtil";
import { MarkdownViewer } from "../controls/MarkdownViewer";
import { find as _find } from "underscore";

const Quiz = ({ match }) => {
  const { readItem } = StorageUtil();
  const [quizId] = useState(match.params.id);
  const [item] = useState(readItem(quizId));
  const [quiz, setQuiz] = useState(null);
  const [visibleIndex, setVisibleIndex] = useState(0);

  useEffect(() => {
    item.questions.map((q) => {
      q.responses = [];
      q.isValid = false;
      return null;
    });
    console.log(item);
    setQuiz(item);
  }, [item]);

  const onPrevios = () => {
    if (visibleIndex > 0) {
      setVisibleIndex(visibleIndex - 1);
    }
  };

  const onNext = () => {
    if (visibleIndex < quiz.questions.length - 1) {
      setVisibleIndex(visibleIndex + 1);
    }
  };

  const onSubmit = () => {
    console.log(quiz);
  };

  const nextOrSubmit = (q) => {
    if (visibleIndex === quiz.questions.length - 1) {
      return (
        <Button
          disabled={!q.isValid}
          className="float-right"
          onClick={() => onSubmit()}>
          Finish and Submit
        </Button>
      );
    }
    return (
      <Button
        disabled={!q.isValid}
        className="float-right"
        onClick={() => onNext()}>
        Next
      </Button>
    );
  };

  const onChange = (e) => {
    const { name, type, id, checked } = e.target;
    const qz = { ...quiz };
    const qq = _find(qz.questions, (q) => {
      return q.id === name;
    });
    let { responses } = qq;
    if (type === "radio") {
      responses.length = 0;
    }
    if (checked) {
      responses.push(id);
    } else {
      responses.splice(responses.indexOf(id), 1);
    }
    qq.isValid = !(responses.length === 0);
    setQuiz(qz);
  };

  const renderQuestions = () => {
    if (!quiz) return <p>Loading...</p>;
    return quiz.questions.map((q, index) => {
      return (
        visibleIndex === index && (
          <Card key={index}>
            <Card.Header>{quiz.name}</Card.Header>
            <Card.Body>
              <MarkdownViewer source={q.question}></MarkdownViewer>
              {q.choices.map((c, index) => {
                return (
                  <Row key={index}>
                    <Col sm={1}>
                      <Form.Check
                        key={index}
                        type={q.type}
                        id={c.id}
                        onChange={onChange}
                        checked={q.responses.indexOf(c.id) > -1}
                        name={q.id}></Form.Check>
                    </Col>
                    <Col>
                      <MarkdownViewer source={c.text}></MarkdownViewer>
                    </Col>
                  </Row>
                );
              })}
            </Card.Body>
            <Card.Footer>
              {nextOrSubmit(q)}
              <Button size="sm" variant="secondary" onClick={onPrevios}>
                Previous
              </Button>
            </Card.Footer>
          </Card>
        )
      );
    });
  };

  return (
    <Container>
      <Row>
        <Col>{renderQuestions()}</Col>
      </Row>
    </Container>
  );
};

export default Quiz;
