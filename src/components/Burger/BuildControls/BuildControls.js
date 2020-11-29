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
  totalPrice,
  purchasable,
  purchaseHandler,
  isAuthenticated,
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
      <p>
        Total Price: <strong>{totalPrice.toFixed(2)}</strong>
      </p>
      <button
        className={classes.OrderButton}
        onClick={purchaseHandler}
        disabled={!purchasable}
      >
        {isAuthenticated ? 'Order now' : ' Sign up to order'}
      </button>
    </div>
  );
};

export default BuildControls;
