import React from "react";
import classes from "./IncreaseButton.module.css";

const IncreaseButton = ({ onClick }) => {
  return (
    <button className={classes.increaseButton} onClick={onClick}>
      +
    </button>
  );
};

export default IncreaseButton;
