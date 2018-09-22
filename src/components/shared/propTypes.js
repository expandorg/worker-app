// @flow
import PropTypes from 'prop-types';
import { formProps } from '@gemsorg/components/modules';

export const userProps = PropTypes.shape({
  id: PropTypes.number.isRequired,

  email: PropTypes.string,
  emailConfirmed: PropTypes.bool,

  address: PropTypes.string,
  addressConfirmed: PropTypes.bool,

  isRequester: PropTypes.bool.isRequired,
  score: PropTypes.number,

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
});

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

export const historyProps = PropTypes.shape({
  replace: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
});

export const locationProps = PropTypes.shape({
  pathname: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
  hash: PropTypes.string.isRequired,
});

export const notificationPayloadProps = PropTypes.shape({
  data: PropTypes.object,
  params: PropTypes.object,
});

export const notificationProps = PropTypes.shape({
  notificationType: PropTypes.string.isRequired,
  payload: notificationPayloadProps,
});
