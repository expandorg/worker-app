import React from 'react';

import { JsScript } from '@expandorg/components';

import settings from '../../common/settings';
import ServiceProviderExtended from './ServiceProviderExtended';

export default function AppContainer({ children }) {
  return (
    <ServiceProviderExtended>
      {children}
      {settings.gtmTrackingId && (
        <JsScript
          src={`https://www.googletagmanager.com/gtm.js?id=${settings.gtmTrackingId}`}
          disable={!settings.gtmTrackingId}
        />
      )}
    </ServiceProviderExtended>
  );
}
