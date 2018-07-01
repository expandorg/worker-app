// @flow

import settings from '../settings';
import { GtmEventsMeta } from './GtmEvents';

export class GoogleTagManager {
  static inited: boolean = false;
  static queue: Array<Object> = [];

  static init() {
    if (!GoogleTagManager.inited) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
      if (GoogleTagManager.queue.length !== 0) {
        GoogleTagManager.queue.forEach((event) => {
          window.dataLayer.push(event);
        });
        GoogleTagManager.queue = [];
      }
      GoogleTagManager.inited = true;
    }
  }

  trackingId: string

  constructor(trackingId: string) {
    this.trackingId = trackingId;
    if (this.trackingId) {
      GoogleTagManager.init();
    }
  }

  track(data: Object) {
    console.log(data);
    if (GoogleTagManager.inited) {
      window.dataLayer.push(data);
    } else {
      GoogleTagManager.queue.push(data);
    }
  }

  createUAEvent = (action: ?string | ?Object): ?Object => {
    let uaLayer = null;
    if (action) {
      if (typeof action === 'object') {
        const event = GtmEventsMeta[action.action];
        if (event) {
          uaLayer = { ...event, ...action };
        }
      } else if (typeof action === 'string') {
        const event = GtmEventsMeta[action];
        if (event) {
          uaLayer = { ...event, action };
        }
      }
    }
    if (uaLayer) {
      return { event: 'uaEvent', ua: uaLayer };
    }
    return undefined;
  }

  event = (action: ?string | ?Object) => {
    const event = this.createUAEvent(action);
    if (event) {
      this.track(event);
    }
  }
}

export const gtm = new GoogleTagManager(settings.gtmTrackingId);
