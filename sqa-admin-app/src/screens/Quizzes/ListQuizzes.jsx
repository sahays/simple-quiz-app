import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Table,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import GraphQlUtil from "../../utils/GraphQlUtil";
import * as queries from "../../graphql/queries";

const ListQuizzes = ({ history }) => {
  const [quizzes, setQuizzes] = useState(null);
  const { query } = GraphQlUtil();
  const charLimit = 200;

  useEffect(() => {
    const load = async () => {
      const {
        data: { listQuizs },
      } = await query(queries.listQuizs);
      setQuizzes(listQuizs.items);
    };

    load();
  }, [query]);

  const renderQuestion = (q) => {
    return q.length > charLimit
      ? `${q.substr(0, charLimit)}...`
      : `${q.substr(0, charLimit)}`;
  };

  const onQuestionClick = (id) => {
    history.push("/question/view/" + id);
  };

  const renderQuestions = (questions) => {
    if (!questions) {
      return <p>Loading...</p>;
    } else if (questions.length === 0) {
      return <p>Start by adding a new question</p>;
    }
    return (
      <React.Fragment>
        <Table className="table-responsive-sm" size="sm" bordered hover striped>
          <tbody>
            {questions.map((q, index) => {
              return (
                <tr key={index}>
                  <td style={{ cursor: "pointer" }}>
                    {renderTags(q, "dark")}
                    <p>{renderQuestion(q.question)}</p>
                    <div>
                      <Button
                        variant="light"
                        size="sm"
                        onClick={() => onQuestionClick(q.id)}>
                        More...
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <small className="text-muted">
          {`Showing first ${charLimit} characters only`}
        </small>
      </React.Fragment>
    );
  };

  const renderTags = (q, variant = "info") => {
    return q.tags.map((t, index) => {
      return (
        <Badge key={index} variant={variant} className="mr-1">
          {t}
        </Badge>
      );
    });
  };

  const onQuizClick = (id) => {
    history.push("/quiz/view/" + id);
  };

  const renderQuizzes = () => {
    if (!quizzes) {
      return <p>Loading...</p>;
    } else if (quizzes.length === 0) {
      return <p>Start by adding a new quiz</p>;
    }
    return quizzes.map((q, index) => {
      return (
        <Card key={index} className="mb-3">
          <Card.Body>
            {renderTags(q)}
            <Card.Title>{q.name}</Card.Title>
            {renderQuestions(q.questions)}
          </Card.Body>
          <Card.Footer>
            <Button
              size="sm"
              onClick={() => onQuizClick(q.id)}
              className="float-right">
              More...
            </Button>
          </Card.Footer>
        </Card>
      );
    });
  };

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <span style={{ textTransform: "uppercase" }}>All Quizzes</span>
              <div className="float-right">
                <Link to="/quiz/create">+ Quiz</Link>
              </div>
            </Card.Header>
            <Card.Body>{renderQuizzes()}</Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default ListQuizzes;
