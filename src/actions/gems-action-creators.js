
import { gemsApi } from '../api/GemsApi';
import { actions } from './action-types';

import { setError, setWorker, setTransactions, repository } from './action-creators';

const setDepositStage = () => ({
  type: actions.SET_DEPOSIT_STAGE,
  payload: null,
});

export const setGemsBalance = () => ({
  type: actions.SET_GEMS_BALANCE,
  payload: null,
});

export const fetchWorkerGemsBalance = () => async (dispatch) => {
  try {
    const data = await gemsApi.fetcBalance();
    dispatch(setGemsBalance(data.balance));
  } catch (err) {
    dispatch(setError(err.toString()));
  }
};

export const depositGems = numGems => async (dispatch) => {
  try {
    const { gems: gemsInstance } = repository;
    dispatch(setDepositStage(1));
    await gemsInstance.approve(process.env.VAULT_ADDRESS, numGems * 1e+18);
    dispatch(setDepositStage(2));

    const data = await gemsApi.deposit({ value: numGems });
    dispatch(setDepositStage(0));
    dispatch(setWorker(data.worker));
    dispatch(setTransactions(data.tx));
  } catch (err) {
    dispatch(setError(err.toString()));
  }
};

export const withdrawPayments = () => async (dispatch) => {
  try {
    const data = await gemsApi.withdraw();
    dispatch(setWorker(data.worker));
    dispatch(setTransactions(data.tx));
  } catch (err) {
    dispatch(setError(err.toString()));
  }
};
