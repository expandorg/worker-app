// @flow
import { gtm } from './GoogleTagManager';
import { type ReduxAction } from '../app/types.flow';

const analyticsMiddlware = () => (next: Function) => (action: ReduxAction) => {
  if (action.meta && action.meta.track) {
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

export default analyticsMiddlware;
