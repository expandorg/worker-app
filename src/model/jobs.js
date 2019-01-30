// @flow
import { userBalance } from '@expandorg/app-gemtokens';

// eslint-disable-next-line import/prefer-default-export
export const jobHasSufficientFunds = (job, user) => {
  if (job.logic.funding.module === 'requirement') {
    const available = userBalance.availableBalance(user);
    return userBalance.isGreaterThanOrEqualTo(
      available,
      job.logic.funding.requirement
    );
  }
  return true;
};
