import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { MarkdownViewer } from "../controls/MarkdownViewer";
import { find as _find } from "underscore";
import GraphQlUtil from "../utils/GraphQlUtil";
import { Link } from "react-router-dom";
import { listResponses as responsesByUser } from "../graphql/queries";
import { getQuiz as getQuizById } from "../graphql/custom/queries";
import { createResponse } from "../graphql/mutations";
import ConfirmModal from "../controls/ConfirmModal";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";

const Quiz = ({ match }) => {
  const { mutation } = GraphQlUtil();
  const history = useHistory();
  const [quizId] = useState(match.params.id);
  const [quiz, setQuiz] = useState(null);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [userAttrs, setUserAttrs] = useState(null);
  const [canNavigate, setCanNavigate] = useState(false);
  const [takeQuiz, setTakeQuiz] = useState(true);
  const [splash, setSplash] = useState(true);

  useEffect(() => {
    const { filter, query } = GraphQlUtil();
    const loadUser = async () => {
      console.log("loading user...");
      const user = await Auth.currentAuthenticatedUser();
      const { attributes } = user;
      setUserAttrs({
        username: user.username,
        lastName: attributes.family_name,
        firstName: attributes.given_name,
      });
      const {
        data: {
          listResponses: { items },
        },
      } = await filter(responsesByUser, {
        username: { eq: user.username },
        quizId: { eq: quizId },
      });
      if (items && items.length > 0) {
        console.log(items);
        setTakeQuiz(false);
      } else {
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
        setQuiz(data);
      }
    };
    loadUser();
  }, [quizId]);

  useEffect(() => {
    if (canNavigate) {
      if (canNavigate) history.push(`/result/${userAttrs.username}/${quizId}`);
    }
  }, [canNavigate, history, quizId, userAttrs]);

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
    console.log(userAttrs);
    ConfirmModal({
      title: "Submit Quiz",
      message: "Are you sure you want to finish and submit?",
      onYes: async () => {
        try {
          const input = {
            username: userAttrs.username,
            userAttrs: {
              firstName: userAttrs.firstName,
              lastName: userAttrs.lastName,
            },
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

  const renderSteps = () => {
    if (!quiz) return <p></p>;
    return (
      <p>
        <small className="text-muted">
          Question {visibleIndex + 1} of {quiz.questions.length}
        </small>
      </p>
    );
  };

  const renderQuestions = () => {
    if (!quiz) return <p>Loading...</p>;

    return quiz.questions.map((q, index) => {
      return (
        visibleIndex === index && (
          <Card key={index}>
            <Card.Header>{quiz.name}</Card.Header>
            <Card.Body>
              {renderSteps()}
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

  const renderSplash = () => {
    if (!takeQuiz)
      return (
        <div>
          <p>Thank you!</p>
          <small>
            Thanks for you interest in this quiz. We have recorded your
            responses and you don't have to retake. Do you want to{" "}
            <Link to="/">try another quiz code</Link>? or{" "}
            <Link to={`/result/${userAttrs.username}/${quizId}`}>
              view your results
            </Link>
          </small>
        </div>
      );

    if (!quiz) return <p>Loading...</p>;
    return (
      <Card>
        <Card.Header>{quiz.name}</Card.Header>
        <Card.Body>
          {quiz.description && quiz.description.length > 0 && (
            <React.Fragment>
              <Card.Title>About the quiz</Card.Title>
              <Card.Text>
                <MarkdownViewer source={quiz.description} />
              </Card.Text>
            </React.Fragment>
          )}
          {quiz.instructions && quiz.instructions.length > 0 && (
            <React.Fragment>
              <Card.Title>Instructions</Card.Title>
              <Card.Text>
                <MarkdownViewer source={quiz.instructions} />
              </Card.Text>
            </React.Fragment>
          )}
          <Card.Title>Total number of questions</Card.Title>
          <Card.Text>{quiz.questions.length}</Card.Text>
          {quiz.timeLimit && (
            <React.Fragment>
              <Card.Title>Time limit</Card.Title>
              <Card.Text>{quiz.timeLimit}</Card.Text>
            </React.Fragment>
          )}
        </Card.Body>
        <Card.Footer>
          <Button variant="primary" size="sm" onClick={() => setSplash(false)}>
            Start quiz
          </Button>
        </Card.Footer>
      </Card>
    );
  };

  const renderView = () => {
    if (splash) return renderSplash();
    return renderQuestions();
  };

  return (
    <Container>
      <Row>
        <Col>{renderView()}</Col>
      </Row>
    </Container>
  );
};

export default Quiz;
