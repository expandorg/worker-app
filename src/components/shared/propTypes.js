import PropTypes from 'prop-types';

export const workerProps = {
  id: PropTypes.string.isRequired,
  vaultBalance: PropTypes.number.isRequired,
  jobBalance: PropTypes.number.isRequired,
};

export const statsProps = {
  pending: PropTypes.number.isRequired,
  accepted: PropTypes.number.isRequired,
  rejected: PropTypes.number.isRequired,
};

export const routerProps = {
  replace: PropTypes.func.isRequired,
  setRouteLeaveHook: PropTypes.func.isRequired,
};

export const routeProps = {
  path: PropTypes.string.isRequired,
};

export const locationProps = {
  pathname: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
  hash: PropTypes.string.isRequired,
};


export const requestStateProps = {
  state: PropTypes.string.isRequired,
  error: PropTypes.object,
};
