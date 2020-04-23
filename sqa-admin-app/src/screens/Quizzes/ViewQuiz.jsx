import React, { useState, useEffect } from "react";
import GraphQlUtil from "../../utils/GraphQlUtil";
import {
  getQuiz as getQuizById,
  listResponses as lisResponsesByQuizId,
} from "../../graphql/queries";
import { Card, Badge, Table, Button } from "react-bootstrap";
import { find as _find, sortBy as _sortBy } from "underscore";
import { QuestionStore } from "../../cache-stores/QuestionStore";

const ViewQuiz = ({ match }) => {
  const [quizId] = useState(match.params.id);
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [leaderboard, setLeaderboard] = useState(null);

  useEffect(() => {
    const { query } = GraphQlUtil();
    const { getAllQuestions } = QuestionStore();
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

    const loadQuestions = async () => {
      try {
        const items = await getAllQuestions();
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

    loadQuestions();
    loadQuiz();
  }, [quizId]);

  useEffect(() => {
    const { filter } = GraphQlUtil();
    const loadResponses = async () => {
      if (quiz && questions) {
        const {
          data: { listResponses },
        } = await filter(lisResponsesByQuizId, {
          quizId: { eq: quizId },
        });
        const data = processResponses(listResponses.items);
        calculateScore(data);
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
          user: r.username,
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

    const poller = setInterval(async () => loadResponses(), 10000);

    return () => {
      clearInterval(poller);
      console.log("cleared poller");
    };
  }, [quizId, questions, quiz]);

  const onDeleteResponses = () => {
    // delete all responses from the quiz
  };

  const renderQuiz = () => {
    if (!quiz) return <p>Loading...</p>;
    return (
      <Card>
        <Card.Header>{quiz.name}</Card.Header>
        <Card.Body>
          {quiz.tags.map((t, index) => {
            return (
              <Badge key={index} variant="info" className="mr-1">
                {t}
              </Badge>
            );
          })}
          <p>
            <Badge variant="primary">{quiz.code}</Badge>
          </p>
          <p>{quiz.description}</p>

          {leaderboard && <h3>Leaderboard</h3>}
          <Table>
            <tbody>
              {leaderboard &&
                leaderboard.map((l, index) => {
                  return (
                    <tr key={index}>
                      <td>{l.user}</td>
                      <td>{l.score}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </Card.Body>
        <Card.Footer>
          <Button variant="danger" size="sm" onClick={onDeleteResponses}>
            Delete Responses
          </Button>
        </Card.Footer>
      </Card>
    );
  };

  return renderQuiz();
};

export default ViewQuiz;
