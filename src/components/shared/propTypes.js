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

export const jobProps = {
  id: PropTypes.number,
  requester: PropTypes.string,
  title: PropTypes.string,
  imageUrl: PropTypes.string,
  description: PropTypes.string,
};

export const historyProps = {
  replace: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
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

export const userProps = {
  email: PropTypes.string,
};
