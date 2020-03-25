// @flow
import { encodeUrlParams } from '@expandorg/api-client';

const placesApi = 'https://api.mapbox.com/geocoding/v5/mapbox.places';

export default class Geocoder {
  apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  suggest = async (query: string, types: string) => {
    if (!query) {
      return [];
    }

    const encoded = encodeURIComponent(query);
    const params = encodeUrlParams({
      access_token: this.apiKey,
      fuzzyMatch: false,
      language: 'en',
      limit: 8,
      types,
    });

    try {
      const response = await fetch(`${placesApi}/${encoded}.json?${params}`);
      const json = await response.json();
      return json.features;
    } catch (e) {
      console.log(e);
    }
    return [];
  };

  reverseGeocode = async (lat: number, lng: number, types: string) => {
    const params = encodeUrlParams({
      access_token: this.apiKey,
      language: 'en',
      types,
    });
    try {
      const response = await fetch(`${placesApi}/${lng},${lat}.json?${params}`);
      const json = await response.json();
      return json.features;
    } catch (e) {
      console.log(e);
    }
    return [];
  };

  extractAddress = (place: Object) => {
    const address = { city: place.text_en, country: '', locality: '' };
    const country = place.context.find((c) => c.id.startsWith('country'));
    if (country) {
      address.country = country.text_en;
    }
    const region = place.context.find((c) => c.id.startsWith('region'));
    if (country) {
      address.locality = region.text_en;
    }
    return address;
  };

  suggestCity = async (query: string) => {
    try {
      const features = await this.suggest(query, 'place');
      if (!features) {
        return [];
      }
      return features;
    } catch (e) {
      console.log(e);
    }
    return [];
  };

  reverseGeocodeCity = async (lat: number, lng: number) => {
    try {
      const features = await this.reverseGeocode(lat, lng, 'place');
      if (!features) {
        return [];
      }
      return features;
    } catch (e) {
      console.log(e);
    }
    return [];
  };
}
