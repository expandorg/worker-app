import { settings } from '@gemsorg/utils';

const appSettings = {
  ...settings,
  googleMapsKey: process.env.GOOGLE_MAPS_API_KEY || 'AIzaSyC_tVILLYrsPVZbJxBbJmJyxiC6vG9CB0I',
};

export default appSettings;
