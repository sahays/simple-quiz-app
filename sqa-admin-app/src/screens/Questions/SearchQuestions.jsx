import React, { useState } from "react";
import { Container, Row, Col, Table, Card, Button } from "react-bootstrap";
import SearchBar from "./SearchBar";
import { MarkdownViewer } from "../../controls/MarkdownViewer";
import { Logger } from "aws-amplify";
import Emoji from "../../controls/Emoji";
import { find, reject } from "underscore";
import { Link } from "react-router-dom";
const logger = new Logger("SearchQuestions");

const SearchQuestions = () => {
  const charThreshold = 2;
  const [items, setItems] = useState(null);
  const [pickedQuestions, setPickedQuestions] = useState([]);

  const onSearchResults = (data) => {
    const {
      data: {
        listQuestions: { items },
      },
    } = data;
    setItems(items);
  };

  const onAdd = (e) => {
    const { value } = e.target;
    const pickedQuestion = find(items, (item) => {
      return item.id === value;
    });
    let questions = [...pickedQuestions];
    questions.push(pickedQuestion);
    setPickedQuestions(questions);
  };

  const onRemove = (e) => {
    reject();
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
                    <Button variant="success" size="sm" onClick={onAdd}>
                      +
                    </Button>
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
    else
      return (
        <small>
          <Emoji icon="🤓" />
          Type a minimum of {charThreshold} characters
        </small>
      );
  };

  const renderPickedQuestions = () => {
    logger.log(pickedQuestions);
    if (pickedQuestions.length > 0) {
      return (
        <React.Fragment>
          <Card.Body>
            <Table>
              <tbody>
                {pickedQuestions.map((qq, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <Button variant="warning" size="sm" onClick={onRemove}>
                          -
                        </Button>
                      </td>
                      <td>
                        <MarkdownViewer source={qq.question}></MarkdownViewer>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Card.Body>
          <Card.Footer>
            <Button className="float-right" size="sm">
              + New Quiz
            </Button>
          </Card.Footer>
        </React.Fragment>
      );
    } else {
      return (
        <Card.Body>
          <small>
            <Emoji icon="🤓" /> Pick any question to start creating a new quiz
          </small>
        </Card.Body>
      );
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <strong>Questions</strong>
              <Link to="/question/create" className="float-right">
                +New Question
              </Link>
            </Card.Header>
            <Card.Body>
              <SearchBar
                className="mb-3"
                onSearch={onSearchResults}
                charThreshold={charThreshold}
              />
              <Card className="mb-3">
                <Card.Body>{renderResults()}</Card.Body>
              </Card>
              <Card>{renderPickedQuestions()}</Card>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default SearchQuestions;
