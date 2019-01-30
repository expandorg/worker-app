// @flow

import { ServiceLocator } from '@expandorg/components';

import { EventSourceService } from '@expandorg/app-utils';
import { TxEventSource } from '@expandorg/app-gemtokens';

import { GoogleTagManager } from '@expandorg/app-utils/gtm';
import { ScriptsLoader } from '@expandorg/utils';
import { GemsService } from '@expandorg/app-web3';

import { validateForm } from '@expandorg/validation';

import settings from './common/settings';

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
