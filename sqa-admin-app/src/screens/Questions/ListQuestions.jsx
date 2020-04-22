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
import { pluck, flatten, uniq } from "underscore";

const ListQuestions = ({ history }) => {
  const charLimit = 200;
  const [allQuestions, setAllQuestions] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    const { query } = GraphQlUtil();
    const load = async () => {
      const {
        data: { listQuestions },
      } = await query(queries.listQuestions);
      const data = listQuestions.items;
      setAllTags(uniq(flatten(pluck(data, "tags"))));
      setQuestions(data);
      setAllQuestions(data);
    };
    load();
  }, []);

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
      return <p>No questions to show</p>;
    }
    return (
      <React.Fragment>
        <p>{renderAllTags()}</p>
        <Table className="table-responsive-sm" size="sm" bordered hover>
          <caption>Showing {questions.length} questions</caption>
          <tbody>
            {questions.map((q, index) => {
              return (
                <tr key={index} onClick={() => onQuestionClick(q.id)}>
                  <td className="clickable">
                    {renderTags(q)}
                    <p>{renderQuestion(q.question)}</p>
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

  const onTagClick = (e) => {
    const data = [...questions];
    const filtered = data.filter((q) => {
      return q.tags.indexOf(e.target.innerText) > -1;
    });
    setQuestions(filtered);
  };

  const renderAllTags = () => {
    let result = [];
    if (allTags) {
      result = allTags.map((t, index) => {
        return (
          <Badge
            key={index}
            variant="primary"
            className="mr-1 clickable"
            onClick={onTagClick}>
            {t}
          </Badge>
        );
      });
    }
    return result;
  };

  const onFilterReset = () => {
    setQuestions(allQuestions);
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
            <Card.Footer>
              <Button variant="secondary" size="sm" onClick={onFilterReset}>
                Reset
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default ListQuestions;
