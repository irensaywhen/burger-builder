import React, { Fragment } from 'react';
import Button from '../../UI/Button/Button';

const OrderSummary = ({
  ingredients,
  purchaseContinueHandler,
  purchaseCancelHandler,
  totalPrice,
}) => {
  const ingredientSummary = Object.keys(ingredients).map(ingredient => (
    <li key={'orderSummary' + ingredient}>
      <span style={{ textTransform: 'capitalize' }}>{ingredient}</span>:{' '}
      {ingredients[ingredient]}
    </li>
  ));
  return (
    <Fragment>
      <h3>Your order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        Total price: <strong>{totalPrice.toFixed(2)}</strong>
      </p>
      <p>Continue to checkout?</p>
      <Button clickHandler={purchaseContinueHandler} btnType='Success'>
        Continue
      </Button>
      <Button clickHandler={purchaseCancelHandler} btnType='Danger'>
        Cancel
      </Button>
    </Fragment>
  );
};

export default OrderSummary;
