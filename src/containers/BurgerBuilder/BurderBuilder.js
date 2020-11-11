import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger/Burger';

export default class BurderBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
  };

  render() {
    return (
      <Fragment>
        <Burger ingredients={this.state.ingredients} />
        <div>Build controls</div>
      </Fragment>
    );
  }
}