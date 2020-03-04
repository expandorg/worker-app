import React from 'react';

import { JsScript } from '@expandorg/components';

import settings from '../../common/settings';

export default function AppContainer({ children }) {
  return (
    <>
      {children}
      <JsScript
        src={`https://www.googletagmanager.com/gtm.js?id=${settings.gtmTrackingId}`}
        disable={!settings.gtmTrackingId}
      />
    </>
  );
}
