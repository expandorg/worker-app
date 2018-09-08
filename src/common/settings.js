const settings = {
  apiUrl: process.env.BACKEND_ADDRESS,
  cookieDomain: process.env.COOKIE_DOMAIN,
  vaultAddress: process.env.VAULT_ADDRESS,
  maintenanceMode: process.env.MAINTENANCE_MODE || false,
  gtmTrackingId: process.env.GTM_TRACKING_ID,
};

global.gemsBuildInfo = gemsBuildInfo; // eslint-disable-line

export default settings;
