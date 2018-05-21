import BigNumber from 'bignumber.js/bignumber';

const stake = new BigNumber(0.1);

export function isWorkerFunded(worker, stats) {
  const totalBalance = new BigNumber(worker.vaultBalance).plus(new BigNumber(worker.jobBalance));
  const pendingPayouts = stake.multipliedBy(new BigNumber(stats.pending));
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


export const getBalance = (worker, staked) => {
  const balance = new BigNumber(worker.vaultBalance + worker.jobBalance);
  return balance.minus(staked).toNumber();
};
