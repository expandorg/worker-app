import React, { Component, createContext } from 'react';

import settings from '../../../common/settings';
import { gtm } from '../../../services/GoogleTagManager';

import withScript from '../withScript';

export const GtmContext = createContext(null);

const src = 'https://www.googletagmanager.com/gtm.js';

class GtmProvider extends Component {
  render() {
    const { children } = this.props;
    return (
      <GtmContext.Provider value={gtm}>
        {children}
      </GtmContext.Provider>
    );
  }
}

export default withScript(`${src}?id=${settings.gtmTrackingId}`)(GtmProvider);
