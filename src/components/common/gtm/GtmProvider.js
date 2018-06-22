import React, { Component, createContext } from 'react';

import GtmWrapper from './GtmWrapper';

export const GtmContext = createContext(null);

export default class GtmProvider extends Component {
  constructor(props) {
    super(props);

    this.wrapper = new GtmWrapper();
  }

  render() {
    const { children } = this.props;

    return (
      <GtmContext.Provider value={this.wrapper}>
        {children}
      </GtmContext.Provider>
    );
  }
}
