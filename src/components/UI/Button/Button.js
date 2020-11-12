import React from 'react';
import classes from './Button.module.css';

const Button = ({ clickHandler, btnType, children }) => {
  return (
    <button
      className={[classes.Button, classes[btnType]].join(' ')}
      onClick={clickHandler}
    >
      {children}
    </button>
  );
};

export default Button;
