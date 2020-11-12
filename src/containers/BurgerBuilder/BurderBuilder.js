import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

export default class BurderBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchasable: false,
  };

  addIngredientHandler = type => {
    this.setState(prevState => {
      const ingredients = {
        ...prevState.ingredients,
      };

      ++ingredients[type];

      const oldPrice = prevState.totalPrice;

      return {
        ingredients,
        totalPrice: oldPrice + INGREDIENT_PRICES[type],
        purchasable: true,
      };
    });
  };

  removeIngredientHandler = type => {
    if (this.state.ingredients[type] <= 0) return;
    this.setState(prevState => {
      const ingredients = {
        ...prevState.ingredients,
      };

      --ingredients[type];

      const oldPrice = prevState.totalPrice;

      return {
        ingredients,
        totalPrice: oldPrice - INGREDIENT_PRICES[type],
        purchasable:
          Object.values(ingredients).reduce((sum, ingredientAmount) => {
            return sum + ingredientAmount;
          }, 0) > 0,
      };
    });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <Fragment>
        <Modal>
          <OrderSummary ingredients={this.state.ingredients} />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          addIngredientHandler={this.addIngredientHandler}
          removeIngredientHandler={this.removeIngredientHandler}
          disabledButtons={disabledInfo}
          totalPrice={this.state.totalPrice}
          purchasable={this.state.purchasable}
        />
      </Fragment>
    );
  }
}
