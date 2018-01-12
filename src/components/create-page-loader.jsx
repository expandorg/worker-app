import React, { PureComponent } from 'react';
import autoBind from 'auto-bind';
import loadableFunctions from '../lib/loadable-map';

export default pageKey => class PageLoader extends PureComponent {
  constructor() {
    super();
    autoBind(this);

    this.state = {
      Component: null,
      loading: true,
    };
  }

  async componentWillMount() {
    const loader = loadableFunctions(pageKey);
    const { default: def } = await loader();

    this.setState({
      Component: def,
      loading: false,
    });
  }

  render() {
    const { Component, loading } = this.state;

    if (!loading) {
      return <Component {...this.props} />;
    }

    return null;
  }
};
