import React, { Component } from 'react';

// importComponent is a function reference in the end
const asyncComponent = importComponent => {
  return class extends Component {
    state = {
      component: null,
    };

    componentDidMount() {
      importComponent().then(cmp => {
        // Here we've loaded the actual component
        this.setState({ component: cmp.default });
      });
    }

    render() {
      const Component = this.state.component;

      return Component ? <Component {...this.props} /> : null;
    }
  };
};

export default asyncComponent;
