import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: null,
  };

  componentDidMount = () => {
    axios
      .get('https://burger-builder-da262.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({ ingredients: response.data });
      })
      .catch(error => {
        this.setState({ error: true });
      });
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

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.setState({ loading: true });
    const order = {
      indredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Iren Gata',
        address: {
          street: 'Teststreet 1',
          zipCode: '411',
          country: 'Russia',
        },
        email: 'fake@gmail.com',
      },
      deliveryMethod: 'fastest',
    };
    axios
      .post('/orders.jso', order)
      .then(response => {
        this.setState({ loading: false, purchasing: false });
      })
      .catch(error => {
        this.setState({ loading: false, purchasing: false });
      });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    const modalContent =
      !this.state.loading || !this.ingredients ? (
        <Spinner />
      ) : (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseCancelHandler={this.purchaseCancelHandler}
          purchaseContinueHandler={this.purchaseContinueHandler}
          totalPrice={this.state.totalPrice}
        />
      );

    const BurgerContent = this.state.ingredients ? (
      <Fragment>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          addIngredientHandler={this.addIngredientHandler}
          removeIngredientHandler={this.removeIngredientHandler}
          disabledButtons={disabledInfo}
          totalPrice={this.state.totalPrice}
          purchasable={this.state.purchasable}
          purchaseHandler={this.purchaseHandler}
        />
      </Fragment>
    ) : this.state.error ? (
      <p>Ingredients can't be loaded :(</p>
    ) : (
      <Spinner />
    );

    return (
      <Fragment>
        <Modal
          show={this.state.purchasing}
          backdropClickHandler={this.purchaseCancelHandler}
        >
          {modalContent}
        </Modal>
        {BurgerContent}
      </Fragment>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
