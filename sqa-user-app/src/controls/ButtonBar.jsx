import React from "react";
import { Button, Spinner } from "react-bootstrap";
import AlertError from "./AlertError";
import AlertInfo from "./AlertInfo";
import AlertWarn from "./AlertWarn";

const ButtonBar = ({ busy, errorMsg, infoMsg, warnMsg }) => {
  const renderSubmit = () => {
    if (busy)
      return (
        <Spinner className="float-right" animation="grow" variant="success" />
      );
    else
      return (
        <Button type="submit" className="float-right">
          Submit
        </Button>
      );
  };

  return (
    <React.Fragment>
      <hr />
      {errorMsg && <AlertError errorMsg={errorMsg} title="Error" />}
      {infoMsg && <AlertInfo infoMsg={infoMsg} title="Success" />}
      {warnMsg && <AlertWarn warnMsg={warnMsg} title="Warning" />}
      {renderSubmit()}
      <Button type="reset" variant="secondary">
        Reset
      </Button>
    </React.Fragment>
  );
};

export default ButtonBar;
