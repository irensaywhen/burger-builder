import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = ({ isAuthenticated }) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link='/'>Burder Bulider</NavigationItem>
      {isAuthenticated ? (
        <React.Fragment>
          <NavigationItem link='/logout'>Logout</NavigationItem>
          <NavigationItem link='/orders'>Orders</NavigationItem>
        </React.Fragment>
      ) : (
        <NavigationItem link='/auth'>Authenticate</NavigationItem>
      )}
    </ul>
  );
};

export default NavigationItems;
