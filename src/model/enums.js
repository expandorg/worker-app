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

export const FieldType = keyMirror({
  text: null,
  number: null,
  email: null,
  password: null,
  submit: null,
  article: null,
  rules: null,
  qa: null,
});

export const NotificationType = keyMirror({
  Balance: null,
  TxError: null,
});
