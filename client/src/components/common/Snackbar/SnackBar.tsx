import React from "react";
import { observer } from "mobx-react";

import snackBarStore from "./store/snackBarStore";

import "./SnackBar.css";
import Button from "../../Button/Button";

const SnackBar = observer(() => {
  const { text, show, urgency, hide } = snackBarStore;
  if (!show) return null;
  return (
    <div className={`snackbar snackbar__${urgency}`}>
      <span>{text}</span>
      <Button label="x" variant="outlined-secondary" onClick={hide} />
    </div>
  );
});

export default SnackBar;
