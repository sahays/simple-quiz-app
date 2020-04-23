import React, { useState, useEffect } from "react";
import GraphQlUtil from "../utils/GraphQlUtil";
import { getQuiz as getQuizById } from "../graphql/custom/queries";
import { listResponses as lisResponsesByQuizId } from "../graphql/queries";
import { find as _find, sortBy as _sortBy, pluck } from "underscore";

export const Result = ({ match }) => {
  const [quizId] = useState(match.params.id);
  const [username] = useState(match.params.username);
  const [score, setScore] = useState(0);
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    // load questions
    const { query } = GraphQlUtil();
    const loadQuestions = async () => {
      const {
        data: { getQuiz },
      } = await query(getQuizById, {
        id: quizId,
      });
      setQuiz(getQuiz);
    };
    loadQuestions();
  }, [quizId]);

  useEffect(() => {
    const { filter } = GraphQlUtil();
    const calculateScore = (responses, questions) => {
      let score = 0;
      if (questions && responses) {
        responses.map((rr) => {
          const qq = _find(questions, (q) => {
            return q.id === rr.questionId;
          });
          if (qq) {
            const correct =
              qq.answers.sort().join(",") === rr.responses.sort().join(",");
            if (correct) score++;
          }
        });
      }
      return score;
    };

    // load responses
    const loadResponses = async () => {
      const {
        data: { listResponses },
      } = await filter(lisResponsesByQuizId, {
        quizId: { eq: quizId },
        username: { eq: username },
      });
      const responses = pluck(listResponses.items, "responses");
      if (quiz) {
        setScore(calculateScore(responses[0], quiz.questions));
      }
    };

    loadResponses();
  }, [quizId, username, quiz]);

  return (
    <div>
      <p>{score}</p>
    </div>
  );
};
