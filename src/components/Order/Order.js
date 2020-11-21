import React from 'react';

import classes from './Order.module.css';

const Order = props => {
  const ingredients = [];

  for (let ingredient in props.ingredients) {
    ingredients.push({
      name: ingredient,
      amount: props.ingredients[ingredient],
    });
  }

  const ingredientsOutput = ingredients.map(ingredient => {
    return (
      <span
        key={ingredient.name}
        style={{
          textTransform: 'capitalize',
          display: 'inline-block',
          padding: '5px',
          margin: '7px',
          border: '1px solid #ccc',
        }}
      >
        {ingredient.name} ({ingredient.amount})&nbsp;
      </span>
    );
  });
  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientsOutput}</p>
      <p>
        Price: <strong>USD {props.price.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
