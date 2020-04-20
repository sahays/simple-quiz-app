import React, { useState } from "react";
import { Alert } from "react-bootstrap";

const AlertError = ({ errorMsg, title }) => {
  const [close, setClose] = useState(false);

  if (errorMsg) {
    if (close) {
      return null;
    }
    return (
      <Alert onClose={() => setClose(true)} variant="danger" dismissible>
        <small>{title}</small>
        <p>{errorMsg}</p>
      </Alert>
    );
  }
  return null;
};

export default AlertError;
