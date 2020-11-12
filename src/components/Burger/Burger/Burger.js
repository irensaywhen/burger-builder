import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from '../BurgerIngredient/BurgerIngredient';

const Burger = ({ ingredients }) => {
  const transformedIngredients = Object.keys(ingredients)
    .map(ingredient => {
      return [...Array(ingredients[ingredient])].map((_, index) => (
        <BurgerIngredient key={ingredient + index} type={ingredient} />
      ));
    })
    .reduce((arr, current) => {
      return arr.concat(current);
    }, []);

  if (transformedIngredients.length === 0) {
    return <p>Please start selecting engredients</p>;
  } else {
    return (
      <div className={classes.Burger}>
        <BurgerIngredient type='bread-top' />
        {transformedIngredients}
        <BurgerIngredient type='bread-bottom' />
      </div>
    );
  }
};

export default Burger;
