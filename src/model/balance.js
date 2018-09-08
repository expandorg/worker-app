// @flow
import BigNumber from 'bignumber.js/bignumber';

export const DEPOSIT_MIN = 500;
export const DEPOSIT_MAX = 1000;
export const WITHDRAW_MIN = 1500;
export const WITHDRAW_MAX = 100000;

export class Balance {
  availableBalance(user: Object) {
    return new BigNumber(user.gems.balance)
      .minus(new BigNumber(user.gems.reserved))
      .toNumber();
  }

  isGreaterThanOrEqualTo = (a: number, b: number) =>
    new BigNumber(a).greaterThanOrEqualTo(new BigNumber(b));

  canDeposit(amount: number, gemsBalance: number) {
    return (
      gemsBalance >= DEPOSIT_MIN &&
      amount >= DEPOSIT_MIN &&
      amount <= DEPOSIT_MAX
    );
  }

  canWithdraw(user: Object, amount: number) {
    const balance = this.get(user);
    return (
      amount >= WITHDRAW_MIN && amount <= balance && amount <= WITHDRAW_MAX
    );
  }

  get(user: Object) {
    const totalBalance = new BigNumber(user.gems.balance).minus(
      new BigNumber(user.gems.reserved)
    );
    return totalBalance.toNumber();
  }
}

export const userBalance = new Balance();
