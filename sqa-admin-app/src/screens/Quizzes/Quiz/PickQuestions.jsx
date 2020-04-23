import React from "react";
import Checkbox from "../../../controls/Checkbox";
import { Badge, Row, Col } from "react-bootstrap";
import { find as _find } from "underscore";
import { FieldArray } from "formik";
import { FilterQuestions } from "./FilterQuestions";

export const PickQuestions = ({
  values,
  questions,
  onReset,
  onFilter,
  onRefresh,
}) => {
  const charLimit = 200;
  const renderQuestion = (q) => {
    return (
      <div>
        {q.length > charLimit
          ? `${q.substr(0, charLimit)}...`
          : `${q.substr(0, charLimit)}`}
      </div>
    );
  };

  const renderTags = (tags) => {
    return tags.map((t, index) => {
      return (
        <Badge key={index} variant="light" className="mr-1">
          {t}
        </Badge>
      );
    });
  };

  const isChecked = ({ qq, values }) => {
    const result = _find(values.questions, (q) => {
      return q.id === qq.id;
    });
    if (result) return true;
    return false;
  };

  const renderQuestions = (values, arrayHelpers) => {
    if (questions) {
      return (
        <React.Fragment>
          <small className="text-muted">pick questions</small>
          {questions.map((qq, index) => {
            return (
              <Row key={index}>
                <Col sm={1}>
                  <Checkbox
                    name={`questions[${index}].id`}
                    value={qq.id}
                    checked={isChecked({
                      qq,
                      values,
                    })}
                    onChange={(e) => {
                      if (e.target.checked) {
                        arrayHelpers.push(qq);
                      } else {
                        arrayHelpers.remove(
                          _find(values.questions, (q) => {
                            return q.id === qq.id;
                          })
                        );
                      }
                    }}
                  />
                </Col>
                <Col>
                  {renderQuestion(qq.question)}
                  {renderTags(qq.tags)}
                </Col>
              </Row>
            );
          })}
        </React.Fragment>
      );
    }
  };

  return (
    <React.Fragment>
      <FilterQuestions
        questions={questions}
        onFilter={onFilter}
        onReset={onReset}
        onRefresh={onRefresh}
      />
      <FieldArray
        name="questions"
        render={(arrayHelpers) => {
          return <div>{renderQuestions(values, arrayHelpers)}</div>;
        }}></FieldArray>
    </React.Fragment>
  );
};
