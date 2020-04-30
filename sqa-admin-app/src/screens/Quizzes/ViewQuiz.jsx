import React, { useState, useEffect } from "react";
import GraphQlUtil from "../../utils/GraphQlUtil";
import {
  getQuiz as getQuizById,
  listUserResponsesByQuiz,
} from "../../graphql/queries";
import { Card, Badge, Table, Button, Row, Col } from "react-bootstrap";
import { find as _find, sortBy as _sortBy } from "underscore";

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
    };
    loadQuestions(quiz);
  }, [quiz]);

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
          <Row>
            <Col>
              <p>
                {loading && (
                  <small className="mr-1 alert alert-info">Loading...</small>
                )}
                {leaderboard && questions && (
                  <React.Fragment>
                    <small className="mr-1 alert alert-primary">{`${questions.length} questions`}</small>{" "}
                    <small className="mr-1 alert alert-primary">{`${leaderboard.length} response(s)`}</small>
                  </React.Fragment>
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
                      <td style={{ textTransform: "capitalize" }}>{l.user}</td>
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
