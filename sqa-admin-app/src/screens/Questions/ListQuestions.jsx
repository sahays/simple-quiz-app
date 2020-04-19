import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Badge,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import GraphQlUtil from "../../utils/GraphQlUtil";
import * as queries from "../../graphql/queries";

const ListQuestions = ({ history }) => {
  const charLimit = 200;
  const [questions, setQuestions] = useState(null);
  const { query } = GraphQlUtil();

  useEffect(() => {
    const load = async () => {
      const {
        data: { listQuestions },
      } = await query(queries.listQuestions);
      setQuestions(listQuestions.items);
    };

    load();
  }, [query]);

  const renderQuestion = (q) => {
    return q.length > charLimit
      ? `${q.substr(0, charLimit)}...`
      : `${q.substr(0, charLimit)}`;
  };

  const renderTags = (q) => {
    return q.tags.map((t, index) => {
      return (
        <Badge key={index} variant="info" className="mr-1">
          {t}
        </Badge>
      );
    });
  };

  const onQuestionClick = (id) => {
    history.push("/question/view/" + id);
  };

  const renderQuestions = () => {
    if (!questions) {
      return <p>Loading...</p>;
    } else if (questions.length === 0) {
      return <p>Start by adding a new question</p>;
    }
    return (
      <React.Fragment>
        <Table className="table-responsive-sm" bordered hover>
          <tbody>
            {questions.map((q, index) => {
              return (
                <tr key={index}>
                  <td style={{ cursor: "pointer" }}>
                    {renderTags(q)}
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

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <span style={{ textTransform: "uppercase" }}>All Questions</span>
              <div className="float-right">
                <Link to="/question/create">+ Question</Link>
              </div>
            </Card.Header>
            <Card.Body>{renderQuestions()}</Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default ListQuestions;
