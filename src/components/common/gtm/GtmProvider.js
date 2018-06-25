import React, { Component, createContext } from 'react';

import settings from '../../../common/settings';
import { ga } from '../../../common/GoogleAnalytics';

import withScript from '../withScript';

export const GtmContext = createContext(null);

const src = 'https://www.googletagmanager.com/gtag/js';

class GtmProvider extends Component {
  render() {
    const { children } = this.props;
    return (
      <GtmContext.Provider value={ga}>
        {children}
      </GtmContext.Provider>
    );
  }
}

export default withScript(`${src}?id=${settings.gaTrackingId}`)(GtmProvider);
