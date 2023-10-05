import React from 'react';
import { Oval } from 'react-loader-spinner';
import styles from './Spinner.module.css';

export const ovalSpinner = {
  height: 40,
  width: 40,
  color: 'black',
  ariaLabel: 'oval-loading',
  secondaryColor: 'grey',
  strokeWidth: 4,
  strokeWidthSecondary: 4,
};

const Spinner = () => {
  return (
    <div className={styles.spinnerWrapper}>
      <Oval
        height={ovalSpinner.height}
        width={ovalSpinner.width}
        color={ovalSpinner.color}
        visible
        ariaLabel={ovalSpinner.ariaLabel}
        secondaryColor={ovalSpinner.secondaryColor}
        strokeWidth={ovalSpinner.strokeWidth}
        strokeWidthSecondary={ovalSpinner.strokeWidthSecondary}
      />
    </div>
  );
};

export default Spinner;
