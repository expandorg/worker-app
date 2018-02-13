import PropTypes from 'prop-types';

export const worker = {
  id: PropTypes.string.isRequired,
  vaultBalance: PropTypes.number.isRequired,
  jobBalance: PropTypes.number.isRequired,
};

export const stats = {
  pending: PropTypes.number.isRequired,
  accepted: PropTypes.number.isRequired,
  rejected: PropTypes.number.isRequired,
};
