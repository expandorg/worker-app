// @flow
import settings from '../common/settings';

import GoogleTagManager from '../common/gtm/GoogleTagManager';

import ServiceLocator from './ServiceLocator';
import GemsService from './GemsService';

import EventSourceService from './EventSourceService';
import UserEventSource from './events/UserEventSource';

const eventSources = new EventSourceService(settings.apiUrl)
  .definition('user', new UserEventSource());

const services = new ServiceLocator()
  .register('gtm', new GoogleTagManager(settings.gtmTrackingId))
  .register('gems', new GemsService(settings.vaultAddress))
  .register('eventSources', eventSources);

export default services;
