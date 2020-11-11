import React from 'react';

import classes from './BuildControl.module.css';

const BuildControl = ({
  label,
  addIngredientHandler,
  removeIngredientHandler,
  disabled,
}) => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{label}</div>
      <button
        className={classes.Less}
        onClick={removeIngredientHandler}
        disabled={disabled}
      >
        Less
      </button>
      <button className={classes.More} onClick={addIngredientHandler}>
        More
      </button>
    </div>
  );
};

export default BuildControl;
