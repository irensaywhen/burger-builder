import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
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
          isAuthenticated={this.props.isAuthenticated}
        />
        <Toolbar
          hamburderIconClickHandler={this.showSideDrawerHandler}
          isAuthenticated={this.props.isAuthenticated}
        />
        <main className={classes.Main}>{this.props.children}</main>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: !!state.auth.token,
  };
};

export default connect(mapStateToProps)(Layout);
