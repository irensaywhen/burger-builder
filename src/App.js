import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import BurderBuilder from './containers/BurgerBuilder/BurderBuilder';

export default class App extends Component {
  render() {
    return (
      <Layout>
        <BurderBuilder />
      </Layout>
    );
  }
}
