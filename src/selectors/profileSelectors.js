// @flow
import { createSelector } from 'reselect';

export const profileSelector = (state: Object) => state.profile.profile;

export const profileFiltersSelector = (state: Object) => state.profile.filters;

export const profileSummarySelector = (state: Object) => state.profile.summary;

export const taskHistorySelector = (state: Object) =>
  state.profile.taskHistory.list;

const taskHistoryEntitiesSelector = (state: Object) =>
  state.profile.taskHistory.entities;

export const makeTaskHistoryItemSelector = (): any =>
  createSelector(
    taskHistoryEntitiesSelector,
    (state, id) => id,
    (entities, id) => entities[id]
  );

export const transactionsHistorySelector = (state: Object) =>
  state.profile.transactionsHistory;

const disputeEntitiesSelector = (state: Object) => state.disputes.entities;

export const makeDisputeSelector = (): any =>
  createSelector(
    disputeEntitiesSelector,
    (state, id) => id,
    (entities, id) => entities[id]
  );
