// @flow
import { gtm } from './GoogleTagManager';
import { type ReduxAction } from '../app/types.flow';

const analyticsMiddlware = () => (next: Function) => (action: ReduxAction) => {
  if (action.meta && action.meta.track) {
    gtm.event(action.meta.track.action);
  }
  return next(action);
};

export default analyticsMiddlware;
