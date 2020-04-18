import React, { useEffect, useState } from "react";
import GraphQlUtil from "../../utils/GraphQlUtil";
import * as queries from "../../graphql/queries";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";

const ViewQuestion = ({ match }) => {
	const [questionId] = useState(match.params.id);
	const [question, setQuestion] = useState({ choices: [], tags: [] });
	const { query } = GraphQlUtil();

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

	const renderQuestion = () => {
		return (
			<Card>
				<Card.Body>
					<Card.Title>{question.question}</Card.Title>
					<Card.Text>
						{question.choices.map((c, index) => {
							return <p key={index}>{c.text}</p>;
						})}
					</Card.Text>
					<Card.Text>
						{question.tags.map((t, index) => {
							return (
								<Badge variant="info" key={index} className="mr-1">
									{t}
								</Badge>
							);
						})}
					</Card.Text>
				</Card.Body>
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
