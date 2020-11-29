import React from 'react';
import Logo from '../../Logo/Logo';
import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import HamburgerIcon from '../HamburgerIcon/HamburgerIcon';

const Toolbar = ({ hamburderIconClickHandler, isAuthenticated }) => {
  return (
    <header className={classes.Toolbar}>
      <HamburgerIcon clickHandler={hamburderIconClickHandler} />
      <div className={[classes.Logo, classes.DesktopOnly].join(' ')}>
        <Logo />
      </div>
      <nav className={classes.DesktopOnly}>
        <NavigationItems isAuthenticated={isAuthenticated}></NavigationItems>
      </nav>
    </header>
  );
};

export default Toolbar;
