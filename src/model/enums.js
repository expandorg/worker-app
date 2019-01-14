// @flow
import { keyMirror } from '@expandorg/utils';

export const UserRoles = keyMirror({});

export const TaskType = keyMirror({
  Trivia: null,
});

export const NotificationType = keyMirror({
  Balance: null,
  TxError: null,
  Report: null,
});

export const OnboardingStatus = {
  InProgress: 'in-progress',
  Passed: 'passed',
  Failed: 'failed',
};
