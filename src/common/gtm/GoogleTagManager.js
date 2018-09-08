// @flow

export default class GoogleTagManager {
  static inited: boolean = false;

  static queue: Array<Object> = [];

  static init() {
    if (!GoogleTagManager.inited) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js',
      });
      if (GoogleTagManager.queue.length !== 0) {
        GoogleTagManager.queue.forEach(event => {
          window.dataLayer.push(event);
        });
        GoogleTagManager.queue = [];
      }
      GoogleTagManager.inited = true;
    }
  }

  trackingId: string;

  constructor(trackingId: string) {
    this.trackingId = trackingId;
    if (this.trackingId) {
      GoogleTagManager.init();
    }
  }

  track(data: Object) {
    if (GoogleTagManager.inited) {
      window.dataLayer.push(data);
    } else {
      GoogleTagManager.queue.push(data);
    }
  }

  createUAEvent = (event: ?string | ?Object): ?Object => {
    let uaLayer = null;
    if (event) {
      if (typeof event === 'object') {
        const [category, action] = event.action.split('/');
        uaLayer = { ...event, category, action };
      } else if (typeof event === 'string') {
        const [category, action] = event.split('/');
        uaLayer = { category, action };
      }
    }
    if (!uaLayer) {
      return undefined;
    }
    return { event: 'uaEvent', ua: uaLayer };
  };

  event = (action: ?string | ?Object) => {
    const event = this.createUAEvent(action);
    if (event) {
      this.track(event);
    }
  };
}
