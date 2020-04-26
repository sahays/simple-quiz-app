import React, { useState } from "react";
import { Formik, Form as FormikForm } from "formik";
import { InputGroup, Form } from "react-bootstrap";
import * as yup from "yup";
import QuestionStore from "../../data-stores/QuestionStore";
import Emoji from "../../controls/Emoji";

const SearchBar = ({ onSearch }) => {
  const { searchQuestions } = QuestionStore();
  const initValue = {
    searchText: "",
  };
  const [initialValue] = useState(initValue);

  const handleChange = async (e) => {
    onSearch(await searchQuestions(e.target.value));
  };

  return (
    <Formik
      initialValues={initialValue}
      enableReinitialize={true}
      validationSchema={yup.object().shape({
        searchText: yup.string().max(10).required(),
      })}>
      {(values) => (
        <FormikForm>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>
                <Emoji icon="🔎" />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              type="text"
              placeholder="start typing to search questions"
              aria-describedby="inputGroupPrepend"
              name="searchText"
              value={values.searchText}
              onChange={handleChange}
            />
          </InputGroup>
        </FormikForm>
      )}
    </Formik>
  );
};

export default SearchBar;
