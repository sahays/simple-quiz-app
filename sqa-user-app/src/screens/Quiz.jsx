import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Question from "./Question";
import { StorageUtil } from "../utils/StorageUtil";
import { find as _find } from "underscore";
// import * as yup from "yup";
// import { Formik, Form, FieldArray } from "formik";

const Quiz = ({ match }) => {
	const { readItem } = StorageUtil();
	const [quizId] = useState(match.params.id);
	// const [quiz, setQuiz] = useState(null);
	const [name, setName] = useState(null);
	const [visibleIndex, setVisibleIndex] = useState(0);
	const [questions, setQuestions] = useState(null);

	useEffect(() => {
		const items = readItem(quizId);
		const item = items[0];
		console.log(item);
		setName(item.name);
		setQuestions(item.questions);
	}, [quizId]);

	const onPrevios = () => {
		if (visibleIndex > 0) {
			setVisibleIndex(visibleIndex - 1);
		}
	};

	const onNext = (response) => {
		if (visibleIndex < questions.length - 1) {
			setVisibleIndex(visibleIndex + 1);
		}
		console.log(response);
	};

	const onSubmit = (response) => {
		console.log(response);
	};

	const renderQuestions = () => {
		if (!questions) {
			return <p>No questions loaded</p>;
		}
		return questions.map((q, index) => {
			return (
				<Question
					key={index}
					quizName={name}
					onPrevios={onPrevios}
					onNext={onNext}
					visible={visibleIndex === index}
					canSubmit={visibleIndex === questions.length - 1}
					onSubmit={onSubmit}
					question={q}
				></Question>
			);
		});
	};

	return (
		<Container>
			<Row>
				<Col>{renderQuestions()}</Col>
			</Row>
		</Container>
	);
};

export default Quiz;
