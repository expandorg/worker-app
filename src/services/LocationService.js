
// @flow

import { PubSub } from '../common/pubsub';

export default class LocationService extends PubSub {
  latLng = null;
  start = false;

  findCurrent = (onLocated: Function) => {
    if (!this.start) {
      this.startLocation();
    }
    return this.sibscribe(onLocated);
  }

  startLocation = () => {
    this.start = true;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latLng = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.notify(this.latLng);
      });
    }
  }
}
