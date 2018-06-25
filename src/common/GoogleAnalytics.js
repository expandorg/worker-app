// @flow
import settings from './settings';

export class GoogleAnalytics {
  static inited: boolean = false;

  static init(trackingId: string) {
    if (!GoogleAnalytics.inited) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function (...args) { window.dataLayer.push(arguments); }; // eslint-disable-line

      window.gtag('js', new Date());
      window.gtag('config', trackingId);

      GoogleAnalytics.inited = true;
    }
    return window.dataLayer;
  }

  trackingId: string

  constructor(trackingId: string) {
    this.trackingId = trackingId;
    GoogleAnalytics.init(trackingId);
  }

  event = (action: string, eventData: ?Object) => {
    if (action) {
      window.gtag('event', action, eventData);
    }
  }

  pageview = (path: string) => {
    window.gtag('config', this.trackingId, {
      page_path: path,
    });
  }
}


export const ga = new GoogleAnalytics(settings.gaTrackingId);
