import { settings } from '@expandorg/utils';

export default {
  ...settings,
  googleMapsKey: process.env.GOOGLE_MAPS_API_KEY,
  mapboxKey:
    process.env.MAPBOX_API_KEY ||
    'pk.eyJ1Ijoic3NvYm9sZXYiLCJhIjoiY2p5aHA2b2gzMDF1MjNjbnJnMjJ5ZGFieCJ9.oC-yZeZxfMezRfwcaiMRjw',
};
