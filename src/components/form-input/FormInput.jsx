import React from 'react';
import PropTypes from 'prop-types';
import styles from './FormInput.module.css';

const FormInput = ({
  label,
  name,
  type,
  value,
  onChange,
  error,
  className,
}) => {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`${styles.input} ${className}`}
      />
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  className: PropTypes.string,
};

export default FormInput;
