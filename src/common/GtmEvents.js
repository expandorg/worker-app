// @flow
import { createActionTypes } from '@gemsorg/app-utils';

export const GtmActions = {
  ...createActionTypes('Tasks', {
    JobAssign: null,
    TaskSubmit: null,
  }),
  ...createActionTypes('Gems', {
    Deposit: null,
    DepositSuccess: null,
    DepositFailed: null,
    Withdraw: null,
    WithdrawSuccess: null,
    WithdrawFailed: null,
  }),
};

export const ua = (
  action: string,
  value?: string | number,
  label?: string
) => ({
  action,
  value,
  label,
});
