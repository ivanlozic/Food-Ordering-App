import React from "react";
import classes from "./DecreaseButton.module.css";

const DecreaseButton = ({ onClick, disabled }) => {
  return (
    <button
      className={classes.decreaseButton}
      onClick={onClick}
      disabled={disabled}
    >
      -
    </button>
  );
};

export default DecreaseButton;
