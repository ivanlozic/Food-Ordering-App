import React from "react";
import classes from "./CloseButton.module.css";

const CloseButton = ({ onClick, isSmall }) => {
  const closeButtonClass = isSmall ? classes.smallCloseButton : classes.closeModalBtn;

  return (
    <button className={closeButtonClass} onClick={onClick}>
      X
    </button>
  );
};

export default CloseButton;