// @flow
import { createSelector } from 'reselect';

import { verificationAssignmentsSelector } from './assignmentsSelectors';

export const responsesEntitiesSelector = (state: Object) => state.responses.entities;

export const makeResponseSelector = () => createSelector(
  responsesEntitiesSelector,
  verificationAssignmentsSelector,
  (state, taskId) => taskId,
  (entities, assignemnts, taskId) => {
    const assignemnt = assignemnts.find(a => a.taskId === taskId);
    if (!assignemnt) {
      return null;
    }
    return entities[assignemnt.responseId];
  },
);
