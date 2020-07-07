// @flow
import { createSelector } from 'reselect';
import { isTaskAssignment } from '../model/assignments';

export const assignmentsEntitiesSelector = (state: Object) =>
  state.assignments.entities;

export const assignmentsListSelector = (state: Object) =>
  state.assignments.list;

export const assignmentsByJobSelector: any = createSelector(
  assignmentsEntitiesSelector,
  assignmentsListSelector,
  (entities, list) =>
    list.reduce(
      (map, id) => {
        const assignment = entities[id];
        const key = isTaskAssignment(assignment) ? 'task' : 'verification';
        map[key][assignment.jobId] = assignment;
        return map;
      },
      { task: {}, verification: {} }
    )
);

export const makeAssignmentSelector = (): any =>
  createSelector(
    assignmentsEntitiesSelector,
    (state, id) => +id,
    (entities, id) => entities[id]
  );
