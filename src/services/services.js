// @flow

import { ServiceLocator } from '@gemsorg/components';

import settings from '../common/settings';

import GoogleTagManager from '../common/gtm/GoogleTagManager';
import ScriptsLoader from '../common/ScriptsLoader';

import GemsService from './GemsService';

import EventSourceService from './EventSourceService';
import TxEventSource from './events/TxEventSource';

const eventSources = new EventSourceService(settings.apiUrl)
  .definition('tx', new TxEventSource());

const services = new ServiceLocator()
  .register('gtm', new GoogleTagManager(settings.gtmTrackingId))
  .register('gems', new GemsService(settings.vaultAddress))
  .register('eventSources', eventSources)
  .register('jsScripts', new ScriptsLoader());

export default services;
