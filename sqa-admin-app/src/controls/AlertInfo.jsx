import React, { useState } from "react";
import { Alert } from "react-bootstrap";

const AlertInfo = ({ infoMsg, title }) => {
  const [close, setClose] = useState(false);

  if (infoMsg) {
    if (close) {
      return null;
    }
    return (
      <Alert onClose={() => setClose(true)} variant="success" dismissible>
        <strong>{title}</strong>
        <div>
          <small>{infoMsg}</small>
        </div>
      </Alert>
    );
  }
  return null;
};

export default AlertInfo;
