import { createAction } from 'redux-actions';

import { actions } from './action-types';
import { setError, setStats } from './action-creators';

import { tasksApi } from '../api/TasksApi';

export const setIsSubmitting = createAction(actions.SET_IS_SUBMITTING);

export const submitTask = submission => async (dispatch) => {
  try {
    dispatch(setIsSubmitting(true));
    const data = await tasksApi.submitTask({ submission });
    dispatch(setStats(data.stats));
  } catch (err) {
    dispatch(setError(err.toString()));
  }
  dispatch(setIsSubmitting(false));
};
