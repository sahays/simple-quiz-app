import React, { useState } from "react";
import { Alert } from "react-bootstrap";

const AlertWarn = ({ warnMsg, title }) => {
  const [close, setClose] = useState(false);

  if (warnMsg) {
    if (close) {
      return null;
    }
    return (
      <Alert onClose={() => setClose(true)} variant="warning" dismissible>
        <small>{title}</small>
        <p>{warnMsg}</p>
      </Alert>
    );
  }
  return null;
};

export default AlertWarn;
