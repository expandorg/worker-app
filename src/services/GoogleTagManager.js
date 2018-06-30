// @flow
import settings from '../common/settings';

export class GoogleTagManager {
  static inited: boolean = false;

  static init() {
    if (!GoogleTagManager.inited) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
      GoogleTagManager.inited = true;
    }
    return window.dataLayer;
  }

  trackingId: string

  constructor(trackingId: string) {
    this.trackingId = trackingId;
    GoogleTagManager.init();
  }

  event = (event: ?string, payload: ?Object) => {
    if (event) {
      window.dataLayer.push({ event, payload });
    }
  }

  pageview = (path: string) => {
    window.dataLayer.push({
      event: 'pageview',
      page: {
        path,
      },
    });
  }
}

export const gtm = new GoogleTagManager(settings.gtmTrackingId);
