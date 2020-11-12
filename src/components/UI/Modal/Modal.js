import React, { Fragment } from 'react';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.module.css';

const Modal = ({ show, children, backdropClickHandler }) => {
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
};

export default Modal;
