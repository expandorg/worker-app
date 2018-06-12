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
    return new BigNumber(pending).multipliedBy(new BigNumber(0.1)).toNumber();
  }

  canDeposit(value: string | number) {
    const amount = +value;
    return amount >= DEPOSIT_MIN && amount <= DEPOSIT_MAX;
  }

  canWithdraw(user: Object) {
    const balance = this.get(user);
    return !!user.address && (balance >= WITHDRAW_MIN);
  }

  get(user: Object) {
    const staked = this.stakedGems(user.stats.pending);
    const balance = new BigNumber(user.gems.balance + user.gems.reserved);
    return balance.minus(staked).toNumber();
  }
}

export const userBalance = new Balance();
