// @flow


export default class GtmWrapper {
  static inited: boolean = false;

  static init(trackingId: string) {
    if (!GtmWrapper.inited) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function (...args) { window.dataLayer.push(arguments); }; // eslint-disable-line

      window.gtag('js', new Date());
      window.gtag('config', trackingId);

      GtmWrapper.inited = true;
    }
    return window.dataLayer;
  }

  dl: Array<any>

  constructor(trackingId: string) {
    this.dl = GtmWrapper.init(trackingId);
  }

  trigger(eventData: Object) {
    this.dl.push(eventData);
  }
}
