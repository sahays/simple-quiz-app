import React, { useState } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import SearchBar from "./SearchBar";
import { MarkdownViewer } from "../../controls/MarkdownViewer";
import { Logger } from "aws-amplify";
const logger = new Logger("SearchQuestions");

const SearchQuestions = () => {
	const charThreshold = 2;
	const [items, setItems] = useState(null);

	const onSearchResults = (data) => {
		const {
			data: {
				listQuestions: { items },
			},
		} = data;
		setItems(items);
	};

	const onQuestionPicked = (e) => {
		logger.debug(e.target.value);
	};

	const renderResults = () => {
		if (items && items.length === 0) return <p>No results</p>;
		else if (items && items.length > 0)
			return (
				<Table>
					<tbody>
						{items.map((item, index) => {
							return (
								<tr key={index}>
									<td>
										<input
											type="checkbox"
											name="questionId"
											value={item.id}
											onChange={onQuestionPicked}
										></input>
									</td>
									<td>
										<MarkdownViewer source={item.question}></MarkdownViewer>
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			);
		else return <small>type a minimum of {charThreshold} characters</small>;
	};

	return (
		<Container>
			<Row>
				<Col>
					<SearchBar onSearch={onSearchResults} charThreshold={charThreshold} />
					{renderResults()}
				</Col>
			</Row>
		</Container>
	);
};
export default SearchQuestions;
