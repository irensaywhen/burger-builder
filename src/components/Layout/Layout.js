import React, { Fragment } from 'react';
import classes from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <Fragment>
      <div>Toolbar, SideDrawer, Backdrop</div>
      <main className={classes.Main}>{children}</main>
    </Fragment>
  );
};

export default Layout;
