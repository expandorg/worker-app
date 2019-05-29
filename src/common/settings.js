import { settings } from '@expandorg/utils';

export default {
  ...settings,
  googleMapsKey: process.env.GOOGLE_MAPS_API_KEY,
};
