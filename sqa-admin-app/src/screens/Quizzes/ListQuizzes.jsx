import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const ListQuizzes = () => {
	return (
		<Container>
			<Row>
				<Col>
					<Card>
						<Card.Header>
							<span style={{ textTransform: "uppercase" }}>All Quizzes</span>
							<div className="float-right">
								<Link to="/quiz/create">Create a new Quiz</Link>
							</div>
						</Card.Header>
						<Card.Body></Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};
export default ListQuizzes;
