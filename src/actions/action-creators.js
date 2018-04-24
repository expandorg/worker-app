import { createAction } from 'redux-actions';
import { promisify } from 'bluebird';
import GemsToken from 'gems-token';

import actions from './action-types';

function apiRequest(endpoint, method = 'GET', body, isJson = true) {
  const options = {
    credentials: 'include',
    mode: 'cors',
    method,
  };
  if (body) {
    if (isJson) {
      options.headers = {
        'content-type': 'application/json',
      };
      options.body = JSON.stringify(body);
    } else {
      options.body = body;
    }
  }
  return fetch(`${process.env.BACKEND_ADDRESS}${endpoint}`, options);
}

export const setError = createAction(actions.SET_ERROR);

export const setGemsInstance = createAction(actions.SET_GEMS_INSTANCE);

export const setIsAuthorized = createAction(actions.SET_IS_AUTHORIZED);

export const setIsJoined = createAction(actions.SET_IS_JOINED);

export const setIsSubmitting = createAction(actions.SET_IS_SUBMITTING);

export const setDepositStage = createAction(actions.SET_DEPOSIT_STAGE);

export const setStats = createAction(actions.SET_STATS);

export const setTitle = createAction(actions.SET_PAGE_TITLE);

export const setWeb3 = createAction(actions.SET_WEB3);

export const setWorker = createAction(actions.SET_WORKER);

export const setGemsBalance = createAction(actions.SET_GEMS_BALANCE);

export const setTransactions = createAction(actions.SET_TRANSACTIONS);

export const setMetamask = createAction(actions.SET_METAMASK);

export const setMetamaskLocked = createAction(actions.SET_METAMASK_LOCKED);

export const logout = () => (dispatch) => {
  document.cookie = `JWT=; expires=Thu, 01 Jan 1970 00:00:01 GMT; domain=${process.env.COOKIE_DOMAIN}; path=/;`;
  dispatch(setIsAuthorized(false));
};

function setLoggedIn(dispatch, data) {
  dispatch(setWorker(data.worker));
  dispatch(setStats(data.stats));
  dispatch(setIsAuthorized(true));
}

function initGemsInstance(web3, dispatch) {
  const address = web3.eth.accounts[0];
  const gemsInstance = new GemsToken(web3.currentProvider, address);
  gemsInstance.init().then(() => {
    dispatch(setGemsInstance(gemsInstance));
  });
}

export const fetchAuth = () => async (dispatch, getState) => {
  try {
    const res = await apiRequest('/auth');
    if (!res.ok) {
      dispatch(logout());
      return;
    }

    const data = await res.json();
    const { web3 } = getState();
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
    dispatch(setWeb3(web3));
    dispatch(setMetamask(true));

    if (web3.eth.accounts.length === 0) {
      dispatch(setMetamaskLocked(true));
      const accountInterval = setInterval(() => {
        if (web3.eth.accounts.length > 0) {
          clearInterval(accountInterval);
          dispatch(setMetamaskLocked(false));
          initGemsInstance(web3, dispatch);
        }
      }, 300);
    } else {
      initGemsInstance(web3, dispatch);
    }
  } catch (err) {
    dispatch(setMetamask(false));
  }
};

export const submitTask = submission => async (dispatch) => {
  try {
    dispatch(setIsSubmitting(true));
    const res = await apiRequest('/submit', 'POST', submission, true);
    if (res.ok) {
      const data = await res.json();
      dispatch(setStats(data.stats));
    } else {
      let errMsg;
      if (res.status < 500) {
        const body = await res.json();
        errMsg = body.error;
      } else {
        errMsg = 'Submit unsuccessful';
      }
      throw new Error(errMsg);
    }
  } catch (err) {
    dispatch(setError(err.toString()));
  }
  dispatch(setIsSubmitting(false));
};

export const login = () => async (dispatch, getState) => {
  try {
    const { web3 } = getState();
    const address = web3.eth.accounts[0];
    const message = [{
      type: 'address',
      name: 'address',
      value: address,
    }];

    const sendAsync = promisify(web3.currentProvider.sendAsync.bind(web3.currentProvider));
    const result = await sendAsync({
      method: 'eth_signTypedData',
      params: [
        message,
        address,
      ],
      from: address,
    });

    const signature = result.result;
    const res = await apiRequest('/login', 'POST', {
      address,
      signature,
    });

    if (res.ok) {
      const data = await res.json();
      setLoggedIn(dispatch, data);
    }
  } catch (err) {
    dispatch(setError(err.toString()));
  }
};

export const fetchWorkerGemsBalance = () => async (dispatch) => {
  try {
    const res = await apiRequest('/gems', 'GET');
    if (!res.ok) {
      throw new Error('Error fetching Gems balance');
    }
    const data = await res.json();
    dispatch(setGemsBalance(data.balance));
  } catch (err) {
    dispatch(setError(err.toString()));
  }
};

export const depositGems = numGems => async (dispatch, getState) => {
  try {
    const { gemsInstance } = getState();
    dispatch(setDepositStage(1));
    await gemsInstance.approve(process.env.VAULT_ADDRESS, numGems * 1e+18);
    dispatch(setDepositStage(2));
    const res = await apiRequest('/deposit', 'POST', { value: numGems }, true);
    if (!res.ok) {
      throw new Error('Error depositing');
    }
    const data = await res.json();
    dispatch(setDepositStage(0));
    dispatch(setWorker(data.worker));
    dispatch(setTransactions(data.tx));
  } catch (err) {
    dispatch(setError(err.toString()));
  }
};

export const withdrawPayments = () => async (dispatch) => {
  try {
    const res = await apiRequest('/withdraw', 'POST');
    if (!res.ok) {
      throw new Error('Error withdrawing');
    }
    const data = await res.json();
    dispatch(setWorker(data.worker));
    dispatch(setTransactions(data.tx));
  } catch (err) {
    dispatch(setError(err.toString()));
  }
};

export const setEmail = email => async (dispatch) => {
  try {
    const res = await apiRequest('/account/email/update', 'POST', email, false);
    if (!res.ok) {
      throw new Error('Error updating email');
    }
    const data = await res.json();
    dispatch(setWorker(data.worker));
  } catch (err) {
    dispatch(setError(err.toString()));
  }
};

export const confirmEmail = code => async (dispatch) => {
  try {
    const res = await apiRequest('/account/email/confirm', 'POST', code, false);
    if (!res.ok) {
      throw new Error('Error confirming email');
    }
    const data = await res.json();
    dispatch(setWorker(data.worker));
  } catch (err) {
    dispatch(setError(err.toString()));
  }
};

export const resendConfirmEmail = () => async (dispatch) => {
  try {
    const res = await apiRequest('/account/email/confirm/resend');
    if (!res.ok) {
      throw new Error('Error sending email');
    }
    await res.json();
  } catch (err) {
    dispatch(setError(err.toString()));
  }
};
