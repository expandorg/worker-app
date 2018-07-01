// @flow
import { keyMirror } from '../utils';

import { type ReduxActionMeta } from '../app/types.flow';

export const UACategories = keyMirror({
  Auth: null,
  Gems: null,
  Tasks: null,
});

export const GtmActions = keyMirror({
  login: null,
  signup: null,
  logout: null,
  job_assign: null,
  task_submitted: null,
  deposit: null,
  withdraw: null,
  password_forgot: null,
  password_change: null,
});


export const GtmEventsMeta = {
  [GtmActions.login]: {
    category: UACategories.Auth,
  },
  [GtmActions.signup]: {
    category: UACategories.Auth,
  },
  [GtmActions.logout]: {
    category: UACategories.Auth,
  },
  [GtmActions.password_forgot]: {
    category: UACategories.Auth,
  },
  [GtmActions.password_change]: {
    category: UACategories.Auth,
  },
  [GtmActions.job_assign]: {
    category: UACategories.Tasks,
  },
  [GtmActions.task_submitted]: {
    category: UACategories.Tasks,
  },
  [GtmActions.deposit]: {
    category: UACategories.Gems,
  },
  [GtmActions.withdraw]: {
    category: UACategories.Gems,
  },
};


export const replaceTrack = (meta: ?ReduxActionMeta, type: string): ?ReduxActionMeta => {
  if (!meta || !meta.track) {
    return meta;
  }
  const { track, ...rest } = meta;
  return {
    ...rest,
    track: {
      action: track[type],
    },
  };
};

export const ua = (action: string, value?: string | number, label?: string) => ({
  action, value, label,
});
