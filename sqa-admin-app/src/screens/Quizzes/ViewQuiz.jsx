import React, { useState, useEffect } from "react";
import GraphQlUtil from "../../utils/GraphQlUtil";
import {
  getQuiz as getQuizById,
  listUserResponsesByQuiz,
} from "../../graphql/queries";
import { Card, Badge, Table, Button, Row, Col } from "react-bootstrap";
import { find as _find, sortBy as _sortBy, pluck } from "underscore";
import { min, max, mode, mean } from "../../utils/MathUtil";

const ViewQuiz = ({ match }) => {
  const [quizId] = useState(match.params.id);
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [leaderboard, setLeaderboard] = useState(null);
  const [poller, setPoller] = useState(null);
  const [loading, setLoading] = useState(false);
  const { query } = GraphQlUtil();

  useEffect(() => {
    const { query } = GraphQlUtil();
    const loadQuiz = async () => {
      try {
        const {
          data: { getQuiz },
        } = await query(getQuizById, {
          id: quizId,
        });
        setQuiz(getQuiz);
      } catch (e) {
        console.log(e);
      }
    };
    loadQuiz();
  }, [quizId]);

  useEffect(() => {
    const loadQuestions = async (quiz) => {
      if (quiz) {
        try {
          const items = quiz.questions;
          const data = [];
          items.map((item) => {
            return data.push({
              questionId: item.id,
              answers: item.answers.sort(),
            });
          });
          setQuestions(data);
        } catch (e) {
          console.log(e);
        }
      }
    };
    loadQuestions(quiz);
  }, [quiz]);

  useEffect(() => {
    return () => {
      if (poller) {
        console.log("stop refresh");
        clearInterval(poller);
        setPoller(false);
      }
    };
  }, [poller]);

  const refreshResponses = async () => {
    if (quiz && questions) {
      setLoading(true);
      const {
        data: {
          listUserResponsesByQuiz: { items },
        },
      } = await query(listUserResponsesByQuiz, {
        quizId: quizId,
        limit: 300,
      });
      const data = processResponses(items);
      calculateScore(data);
      setLoading(false);
    }
  };

  const processResponses = (items) => {
    const data = [];
    items.map((item) => {
      return data.push({
        username: item.username,
        name: item.userAttrs.firstName + " " + item.userAttrs.lastName,
        responses: item.responses,
      });
    });
    return data;
  };

  const calculateScore = (responses) => {
    const users = [];
    responses.map((r) => {
      let score = 0;
      r.responses.map((rr) => {
        const qq = _find(questions, (q) => {
          return q.questionId === rr.questionId;
        });
        if (qq) {
          const correct =
            qq.answers.sort().join(",") === rr.responses.sort().join(",");
          if (correct) score++;
        }
        return null;
      });
      users.push({
        user: r.name,
        score: score,
      });
      return null;
    });
    setLeaderboard(
      _sortBy(users, (u) => {
        return -u.score;
      })
    );
  };

  const startLeaderboardRefresh = () => {
    refreshResponses();
    const code = setInterval(refreshResponses, 10000);
    setPoller(code);
  };

  const stopLeaderboardRefresh = () => {
    if (poller) {
      console.log("stop refresh");
      clearInterval(poller);
      setPoller(false);
    }
  };

  const renderRefresh = () => {
    if (poller) {
      return (
        <Button
          size="sm"
          variant="warning"
          className="float-right"
          onClick={stopLeaderboardRefresh}>
          Stop Auto Refresh
        </Button>
      );
    } else {
      return (
        <Button
          size="sm"
          className="float-right"
          onClick={startLeaderboardRefresh}>
          Load responses
        </Button>
      );
    }
  };

  const renderLeaderboard = () => {
    return (
      <Card className="mt-3">
        <Card.Header>
          <strong>Leaderboard</strong>
          {renderRefresh()}
        </Card.Header>
        <Card.Body>
          {renderAggregation()}
          <Row>
            <Col>
              <p>
                {loading && (
                  <small className="mr-1 alert alert-info">Loading...</small>
                )}
              </p>
            </Col>
          </Row>
          <Table bordered hover striped>
            <tbody>
              {leaderboard &&
                leaderboard.map((l, index) => {
                  return (
                    <tr key={index}>
                      <td style={{ textTransform: "capitalize" }}>
                        {l.user.toLowerCase()}
                      </td>
                      <td style={{ width: "30%" }}>{l.score}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    );
  };

  const renderAggregation = () => {
    if (questions && leaderboard) {
      const scores = pluck(leaderboard, "score");
      const result = mode(scores);
      return (
        <React.Fragment>
          <Row>
            <Col>
              <Card className="mb-3">
                <Card.Body>
                  <h2>{leaderboard.length}</h2>
                  <Card.Subtitle>Total responses</Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="mb-3">
                <Card.Body>
                  <h2>{questions.length}</h2>
                  <Card.Subtitle>Total questions</Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card className="mb-3">
                <Card.Body>
                  <h2>{min(scores)}</h2>
                  <Card.Subtitle>Lowest score</Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="mb-3">
                <Card.Body>
                  <h2>{max(scores)}</h2>
                  <Card.Subtitle>Highest score</Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="mb-3">
                <Card.Body>
                  <h2>{mean(scores)}</h2>
                  <Card.Subtitle>Average score</Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="mb-3">
                <Card.Body>
                  <h2>{result.score}</h2>
                  <Card.Subtitle>{result.count} responses</Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </React.Fragment>
      );
    }
  };

  const renderQuiz = () => {
    if (!quiz) return <p>Loading...</p>;
    return (
      <React.Fragment>
        <Card>
          <Card.Header>
            <strong style={{ textTransform: "capitalize" }}>{quiz.name}</strong>
          </Card.Header>
          <Card.Body>
            <div>
              <small className="text-muted">Tags</small>
              <p>
                {quiz.tags.map((t, index) => {
                  return (
                    <Badge key={index} variant="info" className="mr-1">
                      {t}
                    </Badge>
                  );
                })}
              </p>
            </div>
            <div>
              <small className="text-muted">Quiz code</small>
              <p>{quiz.code}</p>
            </div>
            <div>
              <small className="text-muted">Description</small>
              <p>{quiz.description}</p>
            </div>
          </Card.Body>
        </Card>
        {renderLeaderboard()}
      </React.Fragment>
    );
  };

  return renderQuiz();
};

export default ViewQuiz;
