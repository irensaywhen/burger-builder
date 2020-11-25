import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';
import Burger from '../../components/Burger/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

class BurgerBuilder extends Component {
  state = {
    // Local UI state
    purchasing: false,
    loading: false,
    error: null,
  };

  componentDidMount = () => {
    if (this.state.ingredients) return;
    //axios
    //  .get('https://burger-builder-da262.firebaseio.com/ingredients.json')
    //  .then(response => {
    //    this.setState({ ingredients: response.data });
    //  })
    //  .catch(error => {
    //    this.setState({ error: true });
    //  });
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
    //const queryParams = [];
    //for (let ingredient in this.state.ingredients) {
    //  queryParams.push(
    //    encodeURIComponent(ingredient) +
    //      '=' +
    //      encodeURIComponent(this.state.ingredients[ingredient])
    //  );
    //}
    //
    //queryParams.push(`price=${this.state.totalPrice}`);
    //
    //const queryString = queryParams.join('&');

    //this.props.history.push({
    //  pathname: '/checkout',
    //  search: '?' + queryString,
    //});

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

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingredientName =>
      dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName }),
    onIngredientRemoved: ingredientName =>
      dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
