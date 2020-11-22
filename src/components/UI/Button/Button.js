import React from 'react';
import classes from './Button.module.css';

const Button = ({ clickHandler, btnType, children, disabled }) => {
  return (
    <button
      className={[classes.Button, classes[btnType]].join(' ')}
      onClick={clickHandler}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
