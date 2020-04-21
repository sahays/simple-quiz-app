import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Form,
  Button,
} from "react-bootstrap";
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
    console.log(quiz);
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
    setQuiz(qz);
  };

  const renderQuestions = () => {
    if (!quiz) return <p>Loading...</p>;
    return (
      <Card>
        <Card.Header>{quiz.name}</Card.Header>
        <Card.Body>
          {quiz.tags.map((tag, index) => {
            return (
              <Badge key={index} variant="info" className="mr-1">
                {tag}
              </Badge>
            );
          })}
          {quiz.questions.map((q, index) => {
            return (
              visibleIndex === index && (
                <div key={index}>
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
                  <div>
                    <Button
                      size="sm"
                      variant="primary"
                      className="float-right"
                      onClick={onNext}>
                      Next
                    </Button>
                    <Button size="sm" variant="secondary" onClick={onPrevios}>
                      Previous
                    </Button>
                  </div>
                </div>
              )
            );
          })}
        </Card.Body>
      </Card>
    );
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
