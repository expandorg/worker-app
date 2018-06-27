// @flow
import BigNumber from 'bignumber.js/bignumber';

const stake = new BigNumber(0.1);

export const DEPOSIT_MIN = 500;
export const DEPOSIT_MAX = 1000;
export const WITHDRAW_MIN = 1500;
export const WITHDRAW_MAX = 100000;

export class Balance {
  isFunded(user: Object) {
    const totalBalance = new BigNumber(user.gems.balance).plus(new BigNumber(user.gems.reserved));
    const pendingPayouts = stake.multipliedBy(new BigNumber(user.stats.pending));
    const availableBalance = totalBalance.minus(pendingPayouts);
    return availableBalance.isGreaterThanOrEqualTo(stake);
  }

  stakedGems(pending: number) {
    return stake.multipliedBy(new BigNumber(pending)).toNumber();
  }

  canDeposit(amount: number, gemsBalance: number) {
    return (DEPOSIT_MIN <= gemsBalance) && (DEPOSIT_MIN <= amount) && (amount <= DEPOSIT_MAX);
  }

  canWithdraw(user: Object, amount: number) {
    const balance = this.get(user);
    return (WITHDRAW_MIN <= amount) && (amount <= balance) && (amount <= WITHDRAW_MAX);
  }

  get(user: Object) {
    const totalBalance = new BigNumber(user.gems.balance).minus(new BigNumber(user.gems.reserved));
    return totalBalance.toNumber();
  }
}

export const userBalance = new Balance();
