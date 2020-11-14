import React, { Fragment } from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <Fragment>
      <Toolbar />
      <main className={classes.Main}>{children}</main>
    </Fragment>
  );
};

export default Layout;
