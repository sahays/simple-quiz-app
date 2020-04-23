import React, { useState, useEffect } from "react";

export const Result = ({ match }) => {
  const [quizId] = useState(match.params.id);
  const [username] = useState(match.params.username);

  useEffect(() => {
    // load quiz
  }, []);

  return (
    <div>
      <p>{quizId}</p>
      <p>{username}</p>
    </div>
  );
};
