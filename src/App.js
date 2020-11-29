import React, { Component } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

import Layout from './containers/Layout/Layout';
import BurderBuilder from './containers/BurgerBuilder/BurderBuilder';
import Checkout from './containers/Checkout/Checkout';
import Order from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

class App extends Component {
  componentDidMount() {
    this.props.onAutoSignin();
  }

  render() {
    const routes = this.props.isAuthenticated ? (
      <Switch>
        <Route path='/checkout' component={Checkout} />
        <Route path='/orders' component={Order} />
        <Route path='/logout' component={Logout} />
        <Route path='/' exact component={BurderBuilder} />
      </Switch>
    ) : (
      <Switch>
        <Route path='/auth' component={Auth} />
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
