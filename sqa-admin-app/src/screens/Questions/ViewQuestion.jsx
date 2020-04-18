import React, { useEffect, useState } from "react";
import GraphQlUtil from "../../utils/GraphQlUtil";
import * as queries from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import * as _ from "underscore";
import ConfirmModal from "../../controls/ConfirmModal";

const ViewQuestion = ({ match, history }) => {
  const [questionId] = useState(match.params.id);
  const [question, setQuestion] = useState(null);
  const { query, mutation } = GraphQlUtil();

  useEffect(() => {
    const load = async () => {
      const {
        data: { getQuestion },
      } = await query(queries.getQuestion, {
        id: questionId,
      });
      setQuestion(getQuestion);
    };
    load();
  }, [query, questionId]);

  const getAnswerText = (a) => {
    return _.find(question.choices, (c) => {
      return c.id === a;
    }).text;
  };

  const onDelete = async () => {
    ConfirmModal({
      onYes: async () => {
        try {
          const result = await mutation(
            mutations.deleteQuestion({
              id: questionId,
            })
          );
          console.log(result);
        } catch (e) {
          console.log(e);
        }
      },
    });
  };

  const onBack = () => {
    history.push("/questions");
  };

  const renderQuestion = () => {
    if (!question) {
      return <p>Loading...</p>;
    }
    return (
      <Card>
        <Card.Body>
          <p>
            {question.tags.map((t, index) => {
              return (
                <Badge variant="info" key={index} className="mr-1">
                  {t}
                </Badge>
              );
            })}
          </p>
          <small>Question</small>
          <Card.Text>{question.question}</Card.Text>
          <small>Choices</small>
          {question.choices.map((c, index) => {
            return <Card.Text key={index}>{c.text}</Card.Text>;
          })}
          <small>Answers</small>
          {question.answers.map((a, index) => {
            return <Card.Text key={index}>{getAnswerText(a)}</Card.Text>;
          })}
        </Card.Body>
        <Card.Footer>
          <Button variant="light" size="sm" onClick={onBack}>
            &larr; All Questions
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={onDelete}
            className="float-right">
            Delete
          </Button>
        </Card.Footer>
      </Card>
    );
  };

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body>{renderQuestion()}</Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ViewQuestion;
