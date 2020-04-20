import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import { MarkdownViewer } from "../controls/MarkdownViewer";

const Choices = ({ data, type, name }) => {
	if (!data) {
		return <p>No choices available</p>;
	}
	return data.map((d, index) => {
		return (
			<Row key={index}>
				<Col sm={1}>
					<Form.Check
						key={index}
						type={type}
						id={d.id}
						name={name}
						checked={d.checked}
					></Form.Check>
				</Col>
				<Col>
					<MarkdownViewer source={d.text} />
				</Col>
			</Row>
		);
	});
};

export default Choices;
