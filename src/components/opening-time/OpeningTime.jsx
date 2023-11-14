
import React from 'react';
import classes from './OpeningTime.module.css';

const OpeningTime = () => {
  return (
    <div className={classes.openingTime}>
      <h3>Opening Hours</h3>
      <ul>
        <li>
          <span>Monday - Friday:</span> 10:00 AM - 9:00 PM
        </li>
        <li>
          <span>Saturday - Sunday:</span> 11:00 AM - 8:00 PM
        </li>
      </ul>
    </div>
  );
};

export default OpeningTime;
