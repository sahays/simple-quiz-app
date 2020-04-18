import React, { useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import GraphQlUtil from "../../utils/GraphQlUtil";
import * as queries from "../../graphql/queries";

const ListQuestions = () => {
  const { query } = GraphQlUtil();
  useEffect(() => {
    const load = async () => {
      const {
        data: { listQuestions },
      } = await query(queries.listQuestions);
      console.log(listQuestions);
    };

    load();
  }, []);
  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <span style={{ textTransform: "uppercase" }}>All Questions</span>
              <div className="float-right">
                <Link to="/question/create">Add a new question</Link>
              </div>
            </Card.Header>
            <Card.Body></Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default ListQuestions;
