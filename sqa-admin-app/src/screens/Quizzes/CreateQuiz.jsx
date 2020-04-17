import React, { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const CreateQuiz = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <span style={{ textTransform: "uppercase" }}>New Quiz</span>
            </Card.Header>
            <Card.Body></Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default CreateQuiz;
