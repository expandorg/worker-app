// @flow

import { PubSubMap } from '@expandorg/utils/src/pubsub';

export default class ReverseGeocoder extends PubSubMap {
  valuesCache: Map<string, string> = new Map();

  getKey = (lat: number, lng: number) => `${lat},${lng}`;

  locate = (lat: number, lng: number, onComplete: Function) => {
    const key = this.getKey(lat, lng);
    if (!this.hasKey(key)) {
      this.startGeocoding(lat, lng);
    }
    return this.subscribe(key, onComplete);
  };

  startGeocoding = (lat: number, lng: number) => {
    const latLng = new window.google.maps.LatLng(lat, lng);
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ latLng }, (results, status) => {
      if (status === window.google.maps.GeocoderStatus.OK) {
        const key = this.getKey(lat, lng);
        this.valuesCache.set(key, results);
        this.notify(key, results);
      }
    });
  };

  extractAddress = (results: Array<Object>): Object => {
    const components = ['administrative_area_level_1', 'locality', 'country'];
    const address = {};

    for (let x = 0; x < results.length; x += 1) {
      for (let y = 0; y < results[x].address_components.length; y += 1) {
        if (!components.length) {
          break;
        }
        const type = results[x].address_components[y].types[0];
        if (!address[type]) {
          const index = components.indexOf(type);
          if (index !== -1) {
            address[type] = results[x].address_components[y].long_name;
            components.splice(index, 1);
          }
        }
      }
    }
    return address;
  };
}
