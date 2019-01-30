// @flow
import { keyMirror } from '@expandorg/utils';

export const UserRoles = keyMirror({});

export const TaskType = keyMirror({
  Trivia: null,
});

export const OnboardingStatus = {
  InProgress: 'in-progress',
  Passed: 'passed',
  Failed: 'failed',
};
