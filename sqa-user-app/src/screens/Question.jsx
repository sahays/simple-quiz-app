import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import Choices from "./Choices";
import { MarkdownViewer } from "../controls/MarkdownViewer";

const Question = ({
	question,
	quizName,
	onNext,
	onPrevios,
	visible,
	canSubmit,
	onSubmit,
}) => {
	const [response, setResponse] = useState({
		questionId: question.id,
		responses: [],
	});

	const nextOrSubmit = () => {
		if (canSubmit) {
			return (
				<Button className="float-right" onClick={() => onSubmit(response)}>
					Finish and Submit
				</Button>
			);
		}
		return (
			<Button className="float-right" onClick={() => onNext(response)}>
				Next
			</Button>
		);
	};

	const onChange = (e) => {
		const { id, type, checked } = e.target;
		let r = [];
		if (type === "checkbox") {
			r = [...response.responses];
		}
		if (checked) {
			r.push(id);
		} else {
			r.splice(r.indexOf(id), 1);
		}
		setResponse({
			questionId: question.id,
			responses: r,
		});
	};

	return (
		visible && (
			<Card>
				<Card.Header>{quizName}</Card.Header>
				<Card.Body>
					<MarkdownViewer source={question.question} />
					<div onChange={onChange}>
						<Choices
							data={question.choices}
							type={question.type}
							name={question.id}
							// onChange={onChange}
						></Choices>
					</div>
				</Card.Body>
				<Card.Footer>
					{nextOrSubmit()}
					<Button variant="secondary" onClick={onPrevios}>
						Previous
					</Button>
				</Card.Footer>
			</Card>
		)
	);
};

export default Question;
