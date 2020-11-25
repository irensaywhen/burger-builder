import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

import * as actionTypes from '../../store/actions/index';

class Checkout extends Component {
  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  checkoutCanceledHandler = () => {
    this.props.history.goBack();
  };
  render() {
    const summary =
      this.props.ingredients && !this.props.purchased ? (
        <div>
          <CheckoutSummary
            checkoutContinued={this.checkoutContinuedHandler}
            checkoutCanceled={this.checkoutCanceledHandler}
            ingredients={this.props.ingredients}
          />
          <Route
            path={this.props.match.path + '/contact-data'}
            component={ContactData}
          />
        </div>
      ) : (
        <Redirect to='/' />
      );
    return <div>{summary}</div>;
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burderBuilder.ingredients,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
