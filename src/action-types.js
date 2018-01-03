const actions = [
  'SET_ASSIGNED_JOB_ID',
  'SET_ERROR',
  'SET_IS_AUTHORIZED',
  'SET_JOB',
  'SET_JOBS',
  'SET_TASK',
  'SET_PAGE_TITLE',
  'SET_PREVIOUS_JOB_ID',
  'SET_WEB3',
  'SET_WORKER',
];

export default actions.reduce((prev, cur) => {
  const next = prev;
  next[cur] = cur;
  return next;
}, {});
