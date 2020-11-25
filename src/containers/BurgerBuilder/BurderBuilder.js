import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../store/actions/index';

import axios from '../../axios-orders';

import Burger from '../../components/Burger/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

class BurgerBuilder extends Component {
  state = {
    // Local UI state
    purchasing: false,
    //loading: false,
    //error: null,
  };

  componentDidMount = () => {
    console.log(this.props);
    this.props.onInitIngredients();
  };

  updatePurchaseState = ingredients => {
    return (
      Object.values(ingredients).reduce((sum, ingredientAmount) => {
        return sum + ingredientAmount;
      }, 0) > 0
    );
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  };

  render() {
    const disabledInfo = {
      ...this.props.ingredients,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    const modalContent =
      this.state.loading || !this.props.ingredients ? (
        <Spinner />
      ) : (
        <OrderSummary
          ingredients={this.props.ingredients}
          purchaseCancelHandler={this.purchaseCancelHandler}
          purchaseContinueHandler={this.purchaseContinueHandler}
          totalPrice={this.props.totalPrice}
        />
      );

    const BurgerContent = this.props.ingredients ? (
      <Fragment>
        <Burger ingredients={this.props.ingredients} />
        <BuildControls
          addIngredientHandler={this.props.onIngredientAdded}
          removeIngredientHandler={this.props.onIngredientRemoved}
          disabledButtons={disabledInfo}
          totalPrice={this.props.totalPrice}
          purchasable={this.updatePurchaseState(this.props.ingredients)}
          purchaseHandler={this.purchaseHandler}
        />
      </Fragment>
    ) : this.props.error ? (
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

const mapStateToProps = state => {
  return {
    ingredients: state.burderBuilder.ingredients,
    totalPrice: state.burderBuilder.totalPrice,
    error: state.burderBuilder.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingredientName =>
      dispatch(actionCreators.addIngredient(ingredientName)),
    onIngredientRemoved: ingredientName =>
      dispatch(actionCreators.removeIngredient(ingredientName)),
    onInitIngredients: () => dispatch(actionCreators.initIngredients()),
    onInitPurchase: () => dispatch(actionCreators.purchaseInit()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
