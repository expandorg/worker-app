// @flow
import PropTypes from 'prop-types';
import { formProps } from '@gigs/components/modules';

export const userProps = {
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
};

export const jobProps = {
  id: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  screenshot: PropTypes.string,
  logo: PropTypes.string,
  form: PropTypes.string,
  requesterId: PropTypes.number,
  isActive: PropTypes.bool,
  logic: PropTypes.shape({
    funding: PropTypes.shape({
      reward: PropTypes.number,
    }),
  }),
  gems: PropTypes.shape({
    balance: PropTypes.number,
    reserved: PropTypes.number,
  }),
};

export const onboarding = {
  jobId: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  form: formProps,
};

export const assignmentProps = {
  jobId: PropTypes.number,
  taskId: PropTypes.number,
  responseId: PropTypes.number,
};

export const taskProps = {
  id: PropTypes.number,
  jobId: PropTypes.number,
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


export const notificationPayloadProps = {
  data: PropTypes.object,
  params: PropTypes.object,
};

export const notificationProps = {
  notificationType: PropTypes.string.isRequired,
  payload: PropTypes.shape(notificationPayloadProps),
};
