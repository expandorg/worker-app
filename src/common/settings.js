const settings = {
  apiUrl: process.env.BACKEND_ADDRESS,
  cookieDomain: process.env.COOKIE_DOMAIN,
  vaultAddress: process.env.VAULT_ADDRESS,
  maintenanceMode: process.env.MAINTENANCE_MODE || false,
  gaTrackingId: process.env.GA_TRACKING_ID,
};

export default settings;
