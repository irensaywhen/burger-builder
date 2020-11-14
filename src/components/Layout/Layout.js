import React, { Fragment, Component } from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

export default class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  closeSideDrawerHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  showSideDrawerHandler = () => {
    this.setState({ showSideDrawer: true });
  };

  render() {
    return (
      <Fragment>
        <SideDrawer
          showSideDrawer={this.state.showSideDrawer}
          backdropClickHandler={this.closeSideDrawerHandler}
        />
        <Toolbar hamburderIconClickHandler={this.showSideDrawerHandler} />
        <main className={classes.Main}>{this.props.children}</main>
      </Fragment>
    );
  }
}
