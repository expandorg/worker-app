// @flow
import PropTypes from 'prop-types';
import { formProps } from '@expandorg/modules';

export const jobProps = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  screenshot: PropTypes.string,
  logo: PropTypes.string,
  form: PropTypes.string,
  requesterId: PropTypes.number,
  isActive: PropTypes.bool,
  onboarding: PropTypes.shape({
    enabled: PropTypes.bool,
    successMessage: PropTypes.string,
    failureMessage: PropTypes.string,
  }),
  logic: PropTypes.shape({
    funding: PropTypes.shape({
      reward: PropTypes.number,
    }),
  }),
  gems: PropTypes.shape({
    balance: PropTypes.number,
    reserved: PropTypes.number,
  }),
});

export const onboardingProps = PropTypes.shape({
  jobId: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  message: PropTypes.string,
  form: formProps,
});

export const assignmentProps = PropTypes.shape({
  jobId: PropTypes.number,
  taskId: PropTypes.number,
  responseId: PropTypes.number,
});

export const responseProps = PropTypes.shape({});

export const taskProps = PropTypes.shape({
  id: PropTypes.number,
  jobId: PropTypes.number,
  taskData: PropTypes.object,
});
