import React, { useState, useEffect } from "react";
import { pluck, flatten, uniq, sortBy } from "underscore";
import { Button } from "react-bootstrap";

export const FilterQuestions = ({ questions, onFilter, onReset }) => {
  const [tags, setTags] = useState(null);

  useEffect(() => {
    setTags(sortBy(uniq(flatten(pluck(questions, "tags")))));
  }, [questions]);

  const onTagClick = (text) => {
    if (text) {
      const data = [...questions];
      const filtered = data.filter((q) => {
        return q.tags.indexOf(text) > -1;
      });
      onFilter(filtered);
    }
  };

  const renderTags = () => {
    let result = [];
    if (tags) {
      result = tags.map((t, index) => {
        return (
          <Button
            key={index}
            variant="info"
            type="button"
            size="sm"
            className="mr-1 mb-1 clickable"
            onClick={() => onTagClick(t)}>
            {t}
          </Button>
        );
      });
    }
    result.push(
      <Button
        key={98}
        variant="dark"
        type="button"
        size="sm"
        className="mr-1 mb-1 clickable"
        onClick={() => onReset()}>
        Reset
      </Button>
    );

    return result;
  };

  return <p>{renderTags()}</p>;
};
