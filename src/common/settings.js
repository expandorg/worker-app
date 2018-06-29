const settings = {
  apiUrl: process.env.BACKEND_ADDRESS,
  cookieDomain: process.env.COOKIE_DOMAIN,
  vaultAddress: process.env.VAULT_ADDRESS,
  maintenanceMode: process.env.MAINTENANCE_MODE || false,
  googleMapsKey: process.env.GOOGLE_MAPS_API_KEY || 'AIzaSyC_tVILLYrsPVZbJxBbJmJyxiC6vG9CB0I',
};

export default settings;
