import React, { Component, createContext } from 'react';

import settings from '../../../common/settings';

import withScript from '../withScript';
import GtmWrapper from './GtmWrapper';

export const GtmContext = createContext(null);

const src = 'https://www.googletagmanager.com/gtag/js';

class GtmProvider extends Component {
  constructor(props) {
    super(props);

    this.wrapper = new GtmWrapper(settings.gaTrackingId);
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

export default withScript(`${src}?id=${settings.gaTrackingId}`)(GtmProvider);
