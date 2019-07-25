// @flow

import { PubSub } from '@expandorg/utils/src/pubsub';

export default class LocationService extends PubSub {
  latLng = null;
  started = false;

  findCurrent = (onLocated: Function) => {
    if (!this.started) {
      this.startLocation();
    }
    return this.sibscribe(onLocated);
  };

  startLocation = () => {
    this.started = true;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latLng = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.notify(this.latLng);
      });
    }
  };
}
