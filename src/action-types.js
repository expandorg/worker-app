const actions = [
  'SET_ERROR',
  'SET_GEMS_BALANCE',
  'SET_GEMS_INSTANCE',
  'SET_IS_AUTHORIZED',
  'SET_IS_JOINED',
  'SET_IS_SUBMITTING',
  'SET_STATS',
  'SET_PAGE_TITLE',
  'SET_WEB3',
  'SET_WORKER',
  'SET_TRANSACTIONS',
  'SET_METAMASK',
  'SET_METAMASK_LOCKED',
];

export default actions.reduce((prev, cur) => {
  const next = prev;
  next[cur] = cur;
  return next;
}, {});
