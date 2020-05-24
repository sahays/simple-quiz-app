import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Table, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import GraphQlUtil from "../../utils/GraphQlUtil";
import * as queries from "../../graphql/queries";
import { MarkdownViewer } from "../../controls/MarkdownViewer";

const ListQuizzes = ({ history }) => {
  const [quizzes, setQuizzes] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);

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

  const renderQuestions = (quizId, questions) => {
    if (quizId === showQuiz && questions && questions.length > 0) {
      return (
        <tr>
          <td colSpan="4">
            <Card>
              <Card.Body>
                <ol>
                  {questions.map((qq, index) => {
                    return (
                      <li key={index}>
                        <MarkdownViewer source={qq.question} />
                      </li>
                    );
                  })}
                </ol>
              </Card.Body>
            </Card>
          </td>
        </tr>
      );
    }
  };

  const onQuestionClick = (quizId) => {
    setShowQuiz(quizId);
  };

  const renderQuizzes = () => {
    if (!quizzes) {
      return <p>Loading...</p>;
    } else if (quizzes.length === 0) {
      return <p>Start by adding a new quiz</p>;
    }

    return (
      <Table responsive bordered hover>
        <caption>Showing {quizzes.length} quizzes</caption>
        <thead>
          <tr>
            <th>Name</th>
            <th>Code</th>
            <th>Questions</th>
            {/* <th>Action</th> */}
          </tr>
        </thead>
        <tbody>
          {quizzes.map((qq, index) => {
            return (
              <React.Fragment key={index}>
                <tr>
                  <td
                    onClick={() => onQuizClick(qq.id)}
                    className="clickable"
                    style={{ width: "50%" }}>
                    {qq.name}
                    <div>
                      {qq.tags.map((t, index) => {
                        return (
                          <Badge key={index} variant="light" className="mr-1">
                            {t}
                          </Badge>
                        );
                      })}
                    </div>
                  </td>
                  <td>{qq.code}</td>
                  <td
                    className="clickable"
                    onClick={() => onQuestionClick(qq.id)}>
                    {qq.questions.length}
                  </td>
                  {/* <td>
                    <Button variant="outline-primary" size="sm">
                      Copy to new
                    </Button>
                  </td> */}
                </tr>
                {renderQuestions(qq.id, qq.questions)}
              </React.Fragment>
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
