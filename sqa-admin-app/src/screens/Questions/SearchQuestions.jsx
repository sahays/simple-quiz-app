import React, { useState } from "react";
import { Container, Row, Col, Table, Card, Button } from "react-bootstrap";
import SearchBar from "./SearchBar";
import { MarkdownViewer } from "../../controls/MarkdownViewer";
import { Logger } from "aws-amplify";
import { find, reject } from "underscore";
import { Link } from "react-router-dom";
const logger = new Logger("SearchQuestions");

const SearchQuestions = () => {
  const charThreshold = 2;
  const [items, setItems] = useState([]);
  const [pickedQuestions, setPickedQuestions] = useState([]);

  const onSearchResults = (data) => {
    const {
      data: {
        listQuestions: { items },
      },
    } = data;
    setItems(items);
  };

  const onAdd = (itemId) => {
    const pickedQuestion = find(items, (item) => {
      return item.id === itemId;
    });
    let questions = [...pickedQuestions];
    questions.push(pickedQuestion);
    setPickedQuestions(questions);
  };

  const onRemove = (itemId) => {
    let qq = [...pickedQuestions];
    qq = reject(qq, (q) => {
      return q.id === itemId;
    });
    setPickedQuestions(qq);
  };

  const renderAddButton = (itemId) => {
    if (pickedQuestions && pickedQuestions.length > 0) {
      const picked = find(pickedQuestions, (p) => {
        return p.id === itemId;
      });
      if (picked) {
        return (
          <Button variant="success" disabled size="sm">
            +
          </Button>
        );
      }
    }
    return (
      <Button variant="success" size="sm" onClick={() => onAdd(itemId)}>
        +
      </Button>
    );
  };

  const renderResults = () => {
    if (items && items.length === 0)
      return <p className="text-muted">No results</p>;

    return (
      <Card>
        <Card.Body>
          <Table responsive="sm" borderless>
            <tbody>
              {items.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{renderAddButton(item.id)}</td>
                    <td>
                      <MarkdownViewer source={item.question}></MarkdownViewer>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    );
  };

  const renderPickedQuestions = () => {
    if (pickedQuestions && pickedQuestions.length > 0) {
      logger.debug(pickedQuestions);
      return (
        <Card className="mt-3">
          <Card.Body>
            <Table responsive="sm" borderless>
              <tbody>
                {pickedQuestions.map((qq, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <Button
                          variant="warning"
                          size="sm"
                          onClick={() => onRemove(qq.id)}>
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
        </Card>
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
                + New Question
              </Link>
            </Card.Header>
            <Card.Body>
              <SearchBar
                className="mb-3"
                onSearch={onSearchResults}
                charThreshold={charThreshold}
              />
              {renderResults()}
              {renderPickedQuestions()}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default SearchQuestions;
