// @flow
import { createSelector } from 'reselect';
import { userSelector } from '@expandorg/app-auth/selectors';

import { responsesEntitiesSelector } from './responsesSelectors';

export const defaultVariablesSelector: any = createSelector(
  userSelector,
  user => ({
    workerId: user.id,
  })
);

export const makeTaskVariablesSelector = (): any =>
  createSelector(
    defaultVariablesSelector,
    (_, task) => task,
    (vars, task) => {
      if (!task) {
        return vars;
      }
      return {
        ...vars,
        ...(task.taskData || {}),
      };
    }
  );

export const onboardingVariablesSelector: any = createSelector(
  defaultVariablesSelector,
  vars => vars
);

export const makeVerficationVariablesSelector = (): any =>
  createSelector(
    responsesEntitiesSelector,
    // defaultVariablesSelector,
    (state, task) => task,
    (state, task, assignment) => assignment,
    (responsesEntities, task, assignment) => {
      if (!task || !assignment) {
        return {};
      }
      const response = responsesEntities[assignment.responseId];
      if (!response) {
        return {};
      }
      return {
        workerId: response.workerId,
        ...(task.taskData || {}),
        ...(response.value || {}),
      };
    }
  );
