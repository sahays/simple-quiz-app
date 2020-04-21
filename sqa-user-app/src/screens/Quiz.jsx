import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { MarkdownViewer } from "../controls/MarkdownViewer";
import { find as _find } from "underscore";
import GraphQlUtil from "../utils/GraphQlUtil";
import { createResponse } from "../graphql/mutations";
import { getQuiz as getQuizById } from "../graphql/queries";
import ConfirmModal from "../controls/ConfirmModal";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";

const Quiz = ({ match }) => {
  const { mutation } = GraphQlUtil();
  const history = useHistory();
  const [quizId] = useState(match.params.id);
  const [quiz, setQuiz] = useState(null);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [username, setUsername] = useState(null);
  const [canNavigate, setCanNavigate] = useState(false);

  useEffect(() => {
    const { query } = GraphQlUtil();
    const loadUser = async () => {
      const user = await Auth.currentAuthenticatedUser();
      setUsername(user.username);
    };
    const loadQuiz = async () => {
      try {
        // no retakes: load response to check if this quiz has already been tried
        const {
          data: { getQuiz },
        } = await query(getQuizById, {
          id: quizId,
        });
        const data = getQuiz;
        data.questions.map((q) => {
          q.responses = [];
          q.isValid = false;
          return null;
        });
        // console.log(pluck(data.questions, "responses"));
        setQuiz(data);
      } catch (e) {
        console.log(e);
      }
    };
    loadQuiz();
    loadUser();
  }, [quizId]);

  useEffect(() => {
    if (canNavigate) {
      if (canNavigate) history.push("/");
    }
  }, [canNavigate, history]);

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

  const pickResponses = () => {
    return quiz.questions.map((q) => {
      return {
        questionId: q.id,
        responses: q.responses,
      };
    });
  };

  const onSubmit = async () => {
    ConfirmModal({
      title: "Submit Quiz",
      message: "Are you sure you want to finish and submit?",
      onYes: async () => {
        try {
          const input = {
            username: username,
            quizId: quiz.id,
            responses: pickResponses(),
          };
          await mutation(createResponse, input);
          setCanNavigate(true);
        } catch (e) {
          console.log(e);
        }
      },
    });
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
