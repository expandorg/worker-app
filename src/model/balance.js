// @flow
import BigNumber from 'bignumber.js/bignumber';

const stake = new BigNumber(0.1);

export const DEPOSIT_MIN = 5;
export const DEPOSIT_MAX = 1000;
export const WITHDRAW_MIN = 500;

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
    return (gemsBalance >= DEPOSIT_MIN) && amount >= DEPOSIT_MIN && amount <= DEPOSIT_MAX;
  }

  canWithdraw(user: Object, amount: number) {
    const balance = this.get(user);
    return (balance >= WITHDRAW_MIN) && (amount <= balance);
  }

  get(user: Object) {
    const totalBalance = new BigNumber(user.gems.balance).minus(new BigNumber(user.gems.reserved));
    return totalBalance.toNumber();
  }
}

export const userBalance = new Balance();
