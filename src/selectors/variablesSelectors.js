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
    defaultVariablesSelector,
    (state, task) => task,
    (state, task, assignment) => assignment,
    (responsesEntities, vars, task, assignment) => {
      if (!task || !assignment) {
        return vars;
      }
      const response = responsesEntities[assignment.responseId];
      if (!response) {
        return vars;
      }
      return {
        ...vars,
        ...(task.taskData || {}),
        ...(response.value || {}),
      };
    }
  );
