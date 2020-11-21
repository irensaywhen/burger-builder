import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Layout from './containers/Layout/Layout';
import BurderBuilder from './containers/BurgerBuilder/BurderBuilder';
import Checkout from './containers/Checkout/Checkout';
import Order from './containers/Orders/Orders';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path='/checkout' component={Checkout} />
            <Route path='/orders' component={Order} />
            <Route path='/' exact component={BurderBuilder} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}
