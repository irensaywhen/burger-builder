import React, { Fragment } from 'react';

const OrderSummary = ({ ingredients }) => {
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
      <p>Continue to checkout?</p>
    </Fragment>
  );
};

export default OrderSummary;
