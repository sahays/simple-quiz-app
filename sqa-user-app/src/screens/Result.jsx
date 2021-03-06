import React, { useState, useEffect } from "react";
import GraphQlUtil from "../utils/GraphQlUtil";
import { getQuizWithAnswers } from "../graphql/custom/queries";
import { listUserResponsesByQuiz } from "../graphql/queries";
import { find as _find, pluck } from "underscore";
import { Card } from "react-bootstrap";
import { MarkdownViewer } from "../controls/MarkdownViewer";

export const Result = ({ match }) => {
  const [quizId] = useState(match.params.id);
  const [username] = useState(match.params.username);
  const [score, setScore] = useState(0);
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [responses, setResponses] = useState(null);

  useEffect(() => {
    // load questions
    const { query } = GraphQlUtil();
    const loadQuestions = async () => {
      const {
        data: { getQuiz },
      } = await query(getQuizWithAnswers, {
        id: quizId,
      });
      setQuiz(getQuiz);
      setQuestions(getQuiz.questions);
    };
    loadQuestions();
  }, [quizId]);

  useEffect(() => {
    const { query } = GraphQlUtil();
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
          return null;
        });
      }
      return score;
    };

    // load responses
    const loadResponses = async () => {
      const {
        data: {
          listUserResponsesByQuiz: { items },
        },
      } = await query(listUserResponsesByQuiz, {
        quizId: quizId,
        username: { eq: username },
      });
      const r = pluck(items, "responses");
      if (r && r.length > 0) {
        setResponses(r[0]);
        if (quiz) {
          setScore(calculateScore(r[0], quiz.questions));
        }
      }
    };

    loadResponses();
  }, [quizId, username, quiz]);

  const isCorrect = (responses, answers) => {
    if (
      responses.sort().join(",").toLowerCase() ===
      answers.sort().join(",").toLowerCase()
    ) {
      return <div className="alert alert-success">Correct</div>;
    }
    return <div className="alert alert-warning">Incorrect</div>;
  };

  const renderQuestions = () => {
    if (questions && responses) {
      return questions.map((qq, index) => {
        const r = _find(responses, (rr) => {
          return rr.questionId === qq.id;
        });
        return (
          <React.Fragment key={index}>
            <p>
              <strong>Question</strong>
            </p>
            <MarkdownViewer key={index} source={qq.question}></MarkdownViewer>
            {isCorrect(r.responses, qq.answers)}
            <p>
              <strong>Choices</strong>
            </p>
            {qq.choices.map((cc, index) => {
              return (
                <MarkdownViewer key={index} source={cc.text}></MarkdownViewer>
              );
            })}
            <p>
              <strong>Your responses</strong>
            </p>
            {r.responses.map((rr, index) => {
              return (
                <MarkdownViewer
                  key={index}
                  source={
                    _find(qq.choices, (x) => x.id === rr).text
                  }></MarkdownViewer>
              );
            })}
            <p>
              <strong>Correct answers</strong>
            </p>
            {qq.answers.map((aa, index) => {
              return (
                <MarkdownViewer
                  key={index}
                  source={
                    _find(qq.choices, (x) => x.id === aa).text
                  }></MarkdownViewer>
              );
            })}
            <p>
              <strong>Explanation</strong>
            </p>
            <MarkdownViewer source={qq.explanation}></MarkdownViewer>
            <hr />
          </React.Fragment>
        );
      });
    }
  };

  const renderScore = () => {
    if (questions) {
      return <p>{`${score} out of ${questions.length}`}</p>;
    }
  };

  return (
    <Card>
      <Card.Header>Results</Card.Header>
      <Card.Body>
        {renderScore()}
        {renderQuestions()}
      </Card.Body>
    </Card>
  );
};
