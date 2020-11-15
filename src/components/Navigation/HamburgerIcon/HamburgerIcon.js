import React from 'react';
import classes from './HamburgerIcon.module.css';

const HamburgerIcon = ({ clickHandler }) => {
  return (
    <div className={classes.HamburgerIcon} onClick={clickHandler}>
      <i className='fas fa-bars'></i>
    </div>
  );
};

export default HamburgerIcon;
