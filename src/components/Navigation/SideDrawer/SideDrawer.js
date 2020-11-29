import React, { Fragment } from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const SideDrawer = ({
  backdropClickHandler,
  showSideDrawer,
  isAuthenticated,
}) => {
  // Conditionally attach classes for animation
  const sideDrawerClasses = [classes.SideDrawer];

  if (showSideDrawer) {
    sideDrawerClasses.push(classes.Open);
  } else {
    sideDrawerClasses.push(classes.Close);
  }
  return (
    <Fragment>
      <Backdrop show={showSideDrawer} clickHandler={backdropClickHandler} />
      <div className={sideDrawerClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={isAuthenticated} />
        </nav>
      </div>
    </Fragment>
  );
};

export default SideDrawer;
