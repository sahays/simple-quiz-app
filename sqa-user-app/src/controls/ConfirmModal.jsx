import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";

const ConfirmModal = ({
  title = "Delete",
  message = "Are you sure you want to delete this?",
  yesLabel = "Yes",
  noLabel = "No",
  onYes,
  onNo = () => {},
}) =>
  confirmAlert({
    title: title,
    message: message,
    buttons: [
      {
        label: yesLabel,
        onClick: onYes,
      },
      {
        label: noLabel,
        onClick: onNo,
      },
    ],
  });

export default ConfirmModal;
