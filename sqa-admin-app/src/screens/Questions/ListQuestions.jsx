import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import GraphQlUtil from "../../utils/GraphQlUtil";
import * as queries from "../../graphql/queries";

const ListQuestions = ({ history }) => {
	const [questions, setQuestions] = useState([]);
	const { query } = GraphQlUtil();

	useEffect(() => {
		const load = async () => {
			const {
				data: { listQuestions },
			} = await query(queries.listQuestions);
			setQuestions(listQuestions.items);
		};

		load();
	}, []);

	const renderQuestion = (q) => {
		return q.length > 200 ? `${q.substr(0, 200)}...` : `${q.substr(0, 200)}`;
	};

	const onQuestionClick = (id) => {
		history.push("/question/view/" + id);
	};

	const renderQuestions = () => {
		return (
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Question</th>
						<th>Tags</th>
					</tr>
				</thead>
				<tbody>
					{questions.map((q, index) => {
						return (
							<tr key={index}>
								<td
									style={{ cursor: "pointer" }}
									onClick={() => onQuestionClick(q.id)}
								>
									{renderQuestion(q.question)}
								</td>
								<td>{q.tags}</td>
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
							<span style={{ textTransform: "uppercase" }}>All Questions</span>
							<div className="float-right">
								<Link to="/question/create">Add a new question</Link>
							</div>
						</Card.Header>
						<Card.Body>
							{renderQuestions()}
							<small className="text-muted">
								Showing first 200 characters only
							</small>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};
export default ListQuestions;
