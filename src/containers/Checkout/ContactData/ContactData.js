import React, { Component } from 'react';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';

export default class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
    loading: false,
  };

  submitOrderHandler = event => {
    event.preventDefault();

    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
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
    console.log(order);
    axios
      .post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };

  render() {
    const contactForm = this.state.loading ? (
      <Spinner />
    ) : (
      <React.Fragment>
        <h4>Enter your contact data</h4>
        <form>
          <input type='text' name='name' placeholder='Your name' />
          <input type='email' name='email' placeholder='Your email' />
          <input type='text' name='street' placeholder='Your address' />
          <input type='text' name='postal' placeholder='Postal Code' />
          <Button btnType='Success' clickHandler={this.submitOrderHandler}>
            Order
          </Button>
        </form>
      </React.Fragment>
    );
    return <div className={classes.ContactData}>{contactForm}</div>;
  }
}
