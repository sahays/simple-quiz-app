import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import GraphQlUtil from "../../utils/GraphQlUtil";
import * as queries from "../../graphql/queries";

const ListQuizzes = ({ history }) => {
  const [quizzes, setQuizzes] = useState(null);

  useEffect(() => {
    const { listAll } = GraphQlUtil();
    const load = async () => {
      const {
        data: { listQuizs },
      } = await listAll(queries.listQuizs);
      setQuizzes(listQuizs.items);
    };

    load();
  }, []);

  const onQuizClick = (id) => {
    history.push("/quiz/view/" + id);
  };

  const renderQuizzes = () => {
    if (!quizzes) {
      return <p>Loading...</p>;
    } else if (quizzes.length === 0) {
      return <p>Start by adding a new quiz</p>;
    }

    return (
      <Table className="table-responsive-sm" size="sm" bordered hover striped>
        <caption>Showing {quizzes.length} quizzes</caption>
        <thead>
          <tr>
            <th>Name</th>
            <th>Code</th>
            <th>Questions</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((qq, index) => {
            return (
              <tr
                key={index}
                onClick={() => onQuizClick(qq.id)}
                className="clickable">
                <td style={{ width: "40%" }}>
                  <div>
                    <p>{qq.name}</p>
                    <small>{qq.description}</small>
                  </div>
                </td>
                <td>{qq.code}</td>
                <td>{qq.questions.length}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
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
