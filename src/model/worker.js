import BigNumber from 'bignumber.js/bignumber';

const stake = new BigNumber(0.1);

export function isFunded(user) {
  const totalBalance = new BigNumber(user.gems.balance).plus(new BigNumber(user.gems.reserved));
  const pendingPayouts = stake.multipliedBy(new BigNumber(user.stats.pending));
  const availableBalance = totalBalance.minus(pendingPayouts);
  return availableBalance.isGreaterThanOrEqualTo(stake);
}

export const MIN_BALANCE = 5;

export function isBalanceSufficient(balance) {
  return balance >= MIN_BALANCE;
}


export function workerAddress(worker) {
  return `0x${worker.id}`;
}

export const getStakedGems = pending =>
  new BigNumber(pending).multipliedBy(new BigNumber(0.1)).toNumber();


export const getBalance = (user, staked) => {
  const balance = new BigNumber(user.gems.balance + user.gems.reserved);
  return balance.minus(staked).toNumber();
};
