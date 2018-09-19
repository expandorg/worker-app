// @flow

import { ServiceLocator } from '@gemsorg/components';

import { GoogleTagManager } from '@gemsorg/app-utils/gtm';
import { ScriptsLoader } from '@gemsorg/utils';

import settings from '../common/settings';

import GemsService from './GemsService';

import EventSourceService from './EventSourceService';
import TxEventSource from './events/TxEventSource';

import LocationService from './LocationService';
import ReverseGeocoder from './ReverseGeocoder';

const eventSources = new EventSourceService(settings.apiUrl).definition(
  'tx',
  new TxEventSource()
);

const services = new ServiceLocator()
  .register('gtm', new GoogleTagManager(settings.gtmTrackingId))
  .register('gems', new GemsService(settings.vaultAddress))
  .register('eventSources', eventSources)
  .register('jsScripts', new ScriptsLoader())
  .register('location', new LocationService())
  .register('reverseGeocoder', new ReverseGeocoder());

export default services;
