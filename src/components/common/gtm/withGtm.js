import React, { forwardRef } from 'react';

import { GtmContext } from './GtmProvider';

const withGtm = Component => forwardRef((props, ref) => (
  <GtmContext.Consumer>
    {gtm => <Component {...props} gtm={gtm} ref={ref} />}
  </GtmContext.Consumer>
));

export default withGtm;
