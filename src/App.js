import React, { Component } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

import Layout from './containers/Layout/Layout';
import BurderBuilder from './containers/BurgerBuilder/BurderBuilder';
import Logout from './containers/Auth/Logout/Logout';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

class App extends Component {
  componentDidMount() {
    this.props.onAutoSignin();
  }

  render() {
    const routes = this.props.isAuthenticated ? (
      <Switch>
        <Route path='/checkout' component={asyncCheckout} />
        <Route path='/orders' component={asyncOrders} />
        <Route path='/logout' component={Logout} />
        <Route path='/auth' component={asyncAuth} />
        <Route path='/' exact component={BurderBuilder} />
      </Switch>
    ) : (
      <Switch>
        <Route path='/auth' component={asyncAuth} />
        <Route path='/' exact component={BurderBuilder} />
        <Redirect to='/' />
      </Switch>
    );
    return (
      <BrowserRouter>
        <Layout>{routes}</Layout>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: !!state.auth.token,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAutoSignin: () => dispatch(actions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
