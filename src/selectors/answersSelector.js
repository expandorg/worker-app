import { createSelector } from 'reselect';

export const answersEntitiesSelector = state => state.answers.entities;

export const makeAnswersSelector = () =>
  createSelector(
    answersEntitiesSelector,
    (state, id) => id,
    (entities, id) => entities[id] || null
  );
