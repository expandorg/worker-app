import { createSelector } from 'reselect';

export const questionsEntitiesSelector = state => state.questions.entities;

export const makeQuestionSelector = () => createSelector(
  questionsEntitiesSelector,
  (state, id) => id,
  (entities, id) => entities[id] || null,
);
