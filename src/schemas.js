import PropTypes from 'prop-types';

export const job = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  screenshot: PropTypes.string.isOptional,
  logo: PropTypes.string.isOptional,
  taskDuration: PropTypes.number.isRequired,
  reward: PropTypes.number.isRequired,
  availableTasks: PropTypes.number.isRequired,
};

export const task = {
  description: PropTypes.string.isRequired,
};

export const worker = {
  id: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired,
};
