// @flow

export const profileSelector = (state: Object) => state.profile.profile;

export const profileFiltersSelector = (state: Object) => state.profile.filters;

export const profileSummarySelector = (state: Object) => state.profile.summary;

export const taskHistorySelector = (state: Object) => state.profile.taskHistory;
