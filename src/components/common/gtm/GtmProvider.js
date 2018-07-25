import React, { Component, createContext } from 'react';

import { withScript } from '@gigs/components/hoc';

import settings from '../../../common/settings';
import services from '../../../services/services';


export const GtmContext = createContext(null);

const src = `https://www.googletagmanager.com/gtm.js?id=${settings.gtmTrackingId}`;

class GtmProvider extends Component {
  render() {
    const { children } = this.props;
    const gtm = services.resolve('gtm');
    return (
      <GtmContext.Provider value={gtm}>
        {children}
      </GtmContext.Provider>
    );
  }
}

export default withScript(src, true, false, !settings.gtmTrackingId)(GtmProvider);
