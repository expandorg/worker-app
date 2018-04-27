import { keyMirror } from '../common/utils';

export const createActionTypes = (scope, actionTypes) =>
  keyMirror(actionTypes, key => `${scope}/${key}`);

export const actions = createActionTypes('common', {
  SET_ERROR: null,
  SET_GEMS_BALANCE: null,
  SET_IS_AUTHORIZED: null,
  SET_IS_JOINED: null,
  SET_IS_SUBMITTING: null,
  SET_DEPOSIT_STAGE: null,
  SET_STATS: null,
  SET_WORKER: null,
  SET_TRANSACTIONS: null,
  SET_METAMASK: null,
  SET_METAMASK_LOCKED: null,
});
