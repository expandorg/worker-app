import { actions } from './action-types';

import { userApi } from '../api/UserApi';

import { gemsService } from '../services/GemsService';

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


export const logout = () => (dispatch) => {
  document.cookie = `JWT=; expires=Thu, 01 Jan 1970 00:00:01 GMT; domain=${process.env.COOKIE_DOMAIN}; path=/;`;
  dispatch(setIsAuthorized(false));
};

function setLoggedIn(dispatch, data) {
  dispatch(setWorker(data.worker));
  dispatch(setStats(data.stats));
  dispatch(setIsAuthorized(true));
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
    const accounts = await gemsService.getAccounts();
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


export const login = () => async (dispatch) => {
  try {
    const address = gemsService.getDefaultAccount();
    const { result } = await gemsService.getAccountSingature(address);
    const data = await userApi.login({ address, signature: result });
    setLoggedIn(dispatch, data);
  } catch (err) {
    dispatch(setError(err.toString()));
  }
};
