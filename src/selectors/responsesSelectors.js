// @flow
import { createSelector } from 'reselect';

import {} from './tasksSelectors';

export const responsesEntitiesSelector = (state: Object) =>
  state.responses.entities;

export const assigedResponseListSelector = (state: Object) =>
  state.responses.assigned;

export const makeVerficationVarsSelector = (): any =>
  createSelector(
    responsesEntitiesSelector,
    (state, task) => task,
    (state, task, assignment) => assignment,
    (responsesEntities, task, assignment) => {
      if (!task || !assignment) {
        return null;
      }
      const response = responsesEntities[assignment.responseId];
      if (!response) {
        return null;
      }
      return {
        ...(task.taskData || {}),
        ...(response.value || {}),
      };
    }
  );
