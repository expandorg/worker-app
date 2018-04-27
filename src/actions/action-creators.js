import { createAction } from 'redux-actions';
import GemsToken from 'gems-token';

import { promisify } from '../common/utils';

import { actions } from './action-types';

import { gemsApi } from '../api/GemsApi';
import { userApi } from '../api/UserApi';
import { tasksApi } from '../api/TasksApi';

class Repository {
  web3 = null
  gems = null

  setWeb3 = (web3) => {
    this.web3 = web3;
  }

  setGems = (gems) => {
    this.gems = gems;
  }
}

const repository = new Repository();


export const setError = createAction(actions.SET_ERROR);
export const setGemsBalance = createAction(actions.SET_GEMS_BALANCE);
export const setTransactions = createAction(actions.SET_TRANSACTIONS);
export const setIsJoined = createAction(actions.SET_IS_JOINED);


const setIsAuthorized = createAction(actions.SET_IS_AUTHORIZED);

const setIsSubmitting = createAction(actions.SET_IS_SUBMITTING);

const setDepositStage = createAction(actions.SET_DEPOSIT_STAGE);

const setStats = createAction(actions.SET_STATS);

const setWorker = createAction(actions.SET_WORKER);


const setMetamask = createAction(actions.SET_METAMASK);

const setMetamaskLocked = createAction(actions.SET_METAMASK_LOCKED);


export const logout = () => (dispatch) => {
  document.cookie = `JWT=; expires=Thu, 01 Jan 1970 00:00:01 GMT; domain=${process.env.COOKIE_DOMAIN}; path=/;`;
  dispatch(setIsAuthorized(false));
};

function setLoggedIn(dispatch, data) {
  dispatch(setWorker(data.worker));
  dispatch(setStats(data.stats));
  dispatch(setIsAuthorized(true));
}

function initGemsInstance(web3) {
  const address = web3.eth.accounts[0];
  const gemsInstance = new GemsToken(web3.currentProvider, address);
  gemsInstance.init().then(() => {
    repository.setGems(gemsInstance);
  });
}


export const fetchAuth = () => async (dispatch) => {
  try {
    let data = null;
    try {
      data = await userApi.authorize();
    } catch (e) {
      dispatch(logout());
      return;
    }
    const { web3 } = repository;
    const getAccounts = promisify(web3.eth.getAccounts.bind(web3.eth));
    const accounts = await getAccounts();

    // Ensure account resolved from token matches metamask account
    if (`0x${data.worker.id}` !== accounts[0]) {
      dispatch(logout());
      return;
    }

    setLoggedIn(dispatch, data);
  } catch (err) {
    dispatch(setError(err.toString()));
  }
};


export const initWeb3 = () => (dispatch) => {
  try {
    let web3;
    if (window.web3 !== undefined) {
      web3 = new Web3(window.web3.currentProvider);
    } else {
      throw new Error('MetaMask not loaded');
    }
    repository.setWeb3(web3);
    dispatch(setMetamask(true));

    if (web3.eth.accounts.length === 0) {
      dispatch(setMetamaskLocked(true));
      const accountInterval = setInterval(() => {
        if (web3.eth.accounts.length > 0) {
          clearInterval(accountInterval);
          dispatch(setMetamaskLocked(false));
          initGemsInstance(web3);
        }
      }, 300);
    } else {
      initGemsInstance(web3);
    }
  } catch (err) {
    dispatch(setMetamask(false));
  }
};

export const submitTask = submission => async (dispatch) => {
  try {
    dispatch(setIsSubmitting(true));
    const data = await tasksApi.submitTask({ submission });
    dispatch(setStats(data.stats));
  } catch (err) {
    dispatch(setError(err.toString()));
  }
  dispatch(setIsSubmitting(false));
};

export const login = () => async (dispatch) => {
  try {
    const { web3 } = repository;
    const address = web3.eth.accounts[0];
    const message = [{
      type: 'address',
      name: 'address',
      value: address,
    }];

    const sendAsync = promisify(web3.currentProvider.sendAsync, web3.currentProvider);
    const result = await sendAsync({
      method: 'eth_signTypedData',
      params: [
        message,
        address,
      ],
      from: address,
    });

    const signature = result.result;
    const data = await userApi.login({ address, signature });

    setLoggedIn(dispatch, data);
  } catch (err) {
    dispatch(setError(err.toString()));
  }
};

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

export const setEmail = email => async (dispatch) => {
  try {
    const data = await userApi.setEmail({ email });
    dispatch(setWorker(data.worker));
  } catch (err) {
    dispatch(setError(err.toString()));
  }
};

export const confirmEmail = code => async (dispatch) => {
  try {
    const data = await userApi.confirmEmail({ code });
    dispatch(setWorker(data.worker));
  } catch (err) {
    dispatch(setError(err.toString()));
  }
};

export const resendConfirmEmail = () => async (dispatch) => {
  try {
    const data = await userApi.resendConfirmEmail();
    console.log(data);
  } catch (err) {
    dispatch(setError(err.toString()));
  }
};
