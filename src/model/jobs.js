// @flow
import { userBalance } from '@expandorg/app-gemtokens';

// eslint-disable-next-line import/prefer-default-export
export const jobHasSufficientFunds = (job: Object, user: Object) => {
  if (job.logic.funding.module === 'requirement') {
    return userBalance.get(user) >= job.logic.funding.requirement;
  }
  return true;
};
