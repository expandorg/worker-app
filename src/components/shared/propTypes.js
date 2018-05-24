import PropTypes from 'prop-types';

export const userProps = {
  id: PropTypes.number.isRequired,
  email: PropTypes.string,
  isRequester: PropTypes.bool.isRequired,
  score: PropTypes.number,
  address: PropTypes.shape({
    String: PropTypes.string,
    Valid: PropTypes.bool.isRequired,
  }),
  gems: PropTypes.shape({
    balance: PropTypes.number,
    reserved: PropTypes.number,
    owned: PropTypes.number,
  }),
  stats: PropTypes.shape({
    pending: PropTypes.number.isRequired,
    accepted: PropTypes.number.isRequired,
    rejected: PropTypes.number.isRequired,
  }),
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
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
