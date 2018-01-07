const actions = [
  'SET_ASSIGNED_JOB_ID',
  'SET_ERROR',
  'SET_IS_AUTHORIZED',
  'SET_JOB',
  'SET_JOBS',
  'SET_JOBS_RETRIEVED',
  'SET_TASK',
  'SET_STATS',
  'SET_PAGE_TITLE',
  'SET_PREVIOUS_JOB_ID',
  'SET_WEB3',
  'SET_WORKER',
  'SET_TRANSACTION',
  'SET_METAMASK',
  'SET_METAMASK_LOCKED',
];

export default actions.reduce((prev, cur) => {
  const next = prev;
  next[cur] = cur;
  return next;
}, {});
