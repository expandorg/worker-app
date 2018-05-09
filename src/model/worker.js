/* eslint import/prefer-default-export: 0 */
import Big from 'bignumber.js';

const stake = Big(0.1);

export function isWorkerFunded(worker, stats) {
  const totalBalance = Big(worker.vaultBalance).plus(Big(worker.jobBalance));
  const pendingPayouts = stake.multipliedBy(Big(stats.pending));
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
  Big(pending).multipliedBy(Big(0.1)).toNumber();


export const getBalance = (worker, staked) => {
  const balance = Big(worker.vaultBalance + worker.jobBalance);
  return balance.minus(staked).toNumber();
};
