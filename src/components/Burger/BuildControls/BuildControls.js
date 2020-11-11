import React from 'react';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const BuildControls = ({
  addIngredientHandler,
  removeIngredientHandler,
  disabledButtons,
}) => {
  return (
    <div className={classes.BuildControls}>
      {controls.map(control => (
        <BuildControl
          key={control.label}
          label={control.label}
          disabled={disabledButtons[control.type]}
          addIngredientHandler={() => addIngredientHandler(control.type)}
          removeIngredientHandler={() => removeIngredientHandler(control.type)}
        />
      ))}
    </div>
  );
};

export default BuildControls;
