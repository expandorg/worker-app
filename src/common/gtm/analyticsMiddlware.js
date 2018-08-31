const createAnalyticsMiddlware = services => () => next => action => {
  if (action.meta && action.meta.track) {
    const gtm = services.resolve('gtm');
    if (action.complete) {
      gtm.event(action.meta.track.complete);
    } else if (action.failed) {
      gtm.event(action.meta.track.failed);
    } else {
      gtm.event(action.meta.track.action);
    }
  }
  return next(action);
};

export default createAnalyticsMiddlware;
