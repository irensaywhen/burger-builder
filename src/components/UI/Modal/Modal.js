import React, { Fragment, Component } from 'react';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.module.css';

export default class Modal extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.childen !== this.props.children
    );
  }

  render() {
    const { show, children, backdropClickHandler } = this.props;
    return (
      <Fragment>
        <Backdrop show={show} clickHandler={backdropClickHandler} />
        <div
          style={{
            transform: show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: show ? '1' : '0',
          }}
          className={classes.Modal}
        >
          {children}
        </div>
      </Fragment>
    );
  }
}
