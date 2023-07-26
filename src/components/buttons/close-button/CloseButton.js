import React from 'react';
import classes from './CloseButton.module.css';

const CloseButton = ({ onClick }) => {
  return (
    <button className={classes.closeModalBtn} onClick={onClick}>
      X
    </button>
  );
};

export default CloseButton;
