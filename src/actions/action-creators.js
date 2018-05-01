import GemsToken from 'gems-token';

import { promisify } from '../common/utils';

import { actions } from './action-types';

import { userApi } from '../api/UserApi';

import { repository } from './GemsService';

export const setError = payload => ({
  type: actions.SET_ERROR,
  payload,
});

export const setTransactions = payload => ({
  type: actions.SET_TRANSACTIONS,
  payload,
});
export const setIsJoined = payload => ({
  type: actions.SET_IS_JOINED,
  payload,
});

const setIsAuthorized = payload => ({
  type: actions.SET_IS_AUTHORIZED,
  payload,
});


export const setStats = payload => ({
  type: actions.SET_STATS,
  payload,
});

export const setWorker = payload => ({
  type: actions.SET_WORKER,
  payload,
});

const setMetamask = payload => ({
  type: actions.SET_METAMASK,
  payload,
});

const setMetamaskLocked = payload => ({
  type: actions.SET_METAMASK_LOCKED,
  payload,
});


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
    if (window.web3 === undefined) {
      throw new Error('MetaMask not loaded');
    }
    const web3 = new Web3(window.web3.currentProvider);
    repository.setWeb3(web3);

    dispatch(setMetamask(true));

    if (web3.eth.accounts.length) {
      initGemsInstance(web3);
    } else {
      dispatch(setMetamaskLocked(true));
      const accountInterval = setInterval(() => {
        if (web3.eth.accounts.length) {
          clearInterval(accountInterval);
          dispatch(setMetamaskLocked(false));
          initGemsInstance(web3);
        }
      }, 300);
    }
  } catch (err) {
    dispatch(setMetamask(false));
  }
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
