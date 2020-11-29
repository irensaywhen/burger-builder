import React, { Component } from 'react';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/WithErrorHandler/WithErrorHandler';
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions/index';

import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name',
        },
        value: '',
        validation: {
          required: true,
          minLength: 3,
        },
        valid: false,
        shouldValidate: true,
        touched: false,
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        shouldValidate: true,
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP code',
        },
        value: '',
        validation: {
          required: true,
          maxLength: 6,
        },
        valid: false,
        shouldValidate: true,
        touched: false,
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        shouldValidate: true,
        touched: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your email',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        shouldValidate: true,
        touched: false,
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ],
        },
        value: 'fastest',
        valid: true,
        validation: {},
        shouldValidate: false,
        touched: false,
      },
    },
    formIsValid: false,
  };

  submitOrderHandler = event => {
    event.preventDefault();

    const formData = {};

    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData,
      userId: this.props.userId,
    };

    this.props.onOrderBurger(order, this.props.token);
  };

  inputChangeHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm,
    };

    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };

    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      event.target.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;

    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({ orderForm: updatedOrderForm, formIsValid });
  };

  checkValidity = (value, rules) => {
    if (!rules) return true;

    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  };

  render() {
    const formElementArray = [];
    for (let formElement in this.state.orderForm) {
      formElementArray.push({
        id: formElement,
        config: this.state.orderForm[formElement],
      });
    }
    const contactForm = this.props.loading ? (
      <Spinner />
    ) : (
      <React.Fragment>
        <h4>Enter your contact data</h4>
        <form onSubmit={this.submitOrderHandler}>
          {formElementArray.map(formElement => {
            return (
              <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.shouldValidate}
                touched={formElement.config.touched}
                changeHandler={event =>
                  this.inputChangeHandler(event, formElement.id)
                }
              />
            );
          })}
          <Button btnType='Success' disabled={!this.state.formIsValid}>
            Order
          </Button>
        </form>
      </React.Fragment>
    );
    return <div className={classes.ContactData}>{contactForm}</div>;
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burderBuilder.ingredients,
    totalPrice: state.burderBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actionCreators.purchaseBurger(orderData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
