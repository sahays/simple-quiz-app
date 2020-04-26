import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import SearchBar from "./SearchBar";
const SearchQuestions = () => {
  const onSearchResults = (data) => {
    console.log(data);
  };
  return (
    <Container>
      <Row>
        <Col>
          <SearchBar onSearch={onSearchResults} />
        </Col>
      </Row>
    </Container>
  );
};
export default SearchQuestions;
