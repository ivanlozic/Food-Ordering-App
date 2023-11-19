import React from 'react';
import { Oval } from 'react-loader-spinner';
import styles from './Spinner.module.css';

export const modernSpinner = {
  height: 40,
  width: 40,
  color: '#3498db', 
  ariaLabel: 'oval-loading',
  strokeWidth: 6,
};

const Spinner = () => {
  return (
    <div className={styles.spinnerWrapper}>
      <Oval
        height={modernSpinner.height}
        width={modernSpinner.width}
        color={modernSpinner.color}
        visible
        ariaLabel={modernSpinner.ariaLabel}
        strokeWidth={modernSpinner.strokeWidth}
      />
    </div>
  );
};

export default Spinner;
