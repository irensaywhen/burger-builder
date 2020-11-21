import React from 'react';

import Burger from '../../Burger/Burger/Burger';
import Button from '../../UI/Button/Button';

import classes from './CheckoutSummary.module.css';

const CheckoutSummary = ({
  ingredients,
  checkoutCanceled,
  checkoutContinued,
}) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div style={{ width: '300px', margin: '30px auto' }}>
        <Burger ingredients={ingredients} />
      </div>
      <Button btnType='Danger' clickHandler={checkoutCanceled}>
        CANCEL
      </Button>
      <Button btnType='Success' clickHandler={checkoutContinued}>
        Continue
      </Button>
    </div>
  );
};

export default CheckoutSummary;
