// @flow

import { ServiceLocator } from '@gemsorg/components';

import { GoogleTagManager } from '@gemsorg/app-utils/gtm';
import { ScriptsLoader } from '@gemsorg/utils';
import { GemsService } from '@gemsorg/app-web3';

import { validateForm } from '@gemsorg/validation';

import settings from '../common/settings';

import EventSourceService from './EventSourceService';
import TxEventSource from './events/TxEventSource';

const eventSources = new EventSourceService(settings.apiUrl).definition(
  'tx',
  new TxEventSource()
);

const services = new ServiceLocator()
  .register('gtm', new GoogleTagManager(settings.gtmTrackingId))
  .register('gems', new GemsService(settings.vaultAddress))
  .register('eventSources', eventSources)
  .register('validate', validateForm)
  .register('jsScripts', new ScriptsLoader());

export default services;
