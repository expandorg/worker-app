// @flow
import { keyMirror } from '../common/utils';

export const UserRoles = keyMirror({

});

export const MetamaskState = keyMirror({
  NotInstalled: null,
  NotAuthorized: null,
  Authorized: null,
});


export const TaskType = keyMirror({
  Trivia: null,
});

export const TaskFieldType = keyMirror({
  text: null,
  number: null,
  email: null,
  password: null,
});


export const GTMEvents = keyMirror({
  login: null,
  signup: null,
  logout: null,
  job_assign: null,
  task_submitted: null,
  deposit: null,
  withdraw: null,
  password_forgot: null,
  password_change: null,
});
