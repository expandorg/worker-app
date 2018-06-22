export default class GtmWrapper {
  constructor() {
    this.dl = window.dataLayer;
  }

  trigger(eventData) {
    this.dl.push(eventData);
  }
}
