import React from 'react';
import {
  BreadBottom,
  BreadTop,
  Seeds1,
  Seeds2,
  Meat,
  Cheese,
  Salad,
  Bacon,
} from './BurderIngredient.module.css';
import PropTypes from 'prop-types';

const BurderIngredient = ({ type }) => {
  let ingredient = null;

  switch (type) {
    case 'bread-bottom':
      ingredient = <div className={BreadBottom}></div>;
      break;
    case 'bread-top':
      ingredient = (
        <div className={BreadTop}>
          <div className={Seeds1}></div>
          <div className={Seeds2}></div>
        </div>
      );
      break;
    case 'meat':
      ingredient = <div className={Meat}></div>;
      break;
    case 'cheese':
      ingredient = <div className={Cheese}></div>;
      break;
    case 'salad':
      ingredient = <div className={Salad}></div>;
      break;
    case 'bacon':
      ingredient = <div className={Bacon}></div>;
      break;
    default:
      ingredient = null;
  }
  return ingredient;
};

BurderIngredient.propTypes = {
  type: PropTypes.string,
};

export default BurderIngredient;
