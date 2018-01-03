import { createAction } from 'redux-actions';
import { replace } from 'react-router-redux';
// import contract from 'truffle-contract';
import { promisify } from 'bluebird';
import actions from './action-types';
import store from './store';
// import jobArtifacts from '../build/contracts/Job.json';
import config from '../config/local.json';

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
  return fetch(`http://${config.API_ADDRESS}${endpoint}`, options);
}

export const setError = createAction(actions.SET_ERROR);

export const setIsAuthorized = createAction(actions.SET_IS_AUTHORIZED);

export const setAssignedJobId = createAction(actions.SET_ASSIGNED_JOB_ID);

export const setJob = createAction(actions.SET_JOB);

export const setJobs = createAction(actions.SET_JOBS);

export const setPreviousJobId = createAction(actions.SET_PREVIOUS_JOB_ID);

export const setTask = createAction(actions.SET_TASK);

export const setTitle = createAction(actions.SET_PAGE_TITLE);

export const setWeb3 = createAction(actions.SET_WEB3);

export const setWorker = createAction(actions.SET_WORKER);

export const logout = () => (dispatch) => {
  document.cookie = 'JWT=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  dispatch(setIsAuthorized(false));
};

function setLoggedIn(dispatch, data) {
  dispatch(setWorker(data.worker));
  dispatch(setTask(data.task));
  if (data.job !== null) {
    dispatch(setAssignedJobId(data.job.id));
    dispatch(setPreviousJobId(data.job.id));
  }
  dispatch(setIsAuthorized(true));
}

export const fetchAuth = () => async (dispatch) => {
  try {
    const res = await apiRequest('/auth');
    if (!res.ok) {
      dispatch(logout());
      return;
    }

    const data = await res.json();
    const { web3 } = store.getState();
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

export const fetchJobs = () => async (dispatch) => {
  try {
    const res = await apiRequest('/jobs');
    const data = await res.json();
    const jobs = data.reduce((result, job) => {
      result[job.id] = job;
      return result;
    }, {});

    dispatch(setJobs(jobs));

    const { previousJobId } = store.getState();
    if (
      previousJobId !== null
      && jobs[previousJobId] !== undefined
      && jobs[previousJobId].availableTasks <= 0
    ) {
      dispatch(setPreviousJobId(null));
    }
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
  } catch (err) {
    dispatch(setError(err.Error()));
  }
};

export const assignTask = jobId => async (dispatch) => {
  try {
    const res = await apiRequest(`/jobs/${jobId}/assign`, 'POST');
    const data = await res.json();

    dispatch(setTask(data.task));
    dispatch(setAssignedJobId(data.job.id));
    dispatch(setPreviousJobId(data.job.id));
    dispatch(replace('/task'));
  } catch (err) {
    dispatch(setError(err.toString()));
  }
};

export const submitTask = value => async (dispatch) => {
  try {
    const { assignedJobId, task } = store.getState();
    const res = await apiRequest(`/jobs/${assignedJobId}/tasks/${task.id}/submit`, 'POST', value, false);
    if (res.ok) {
      const job = await res.json();
      dispatch(setJob({
        jobId: assignedJobId,
        job,
      }));
      dispatch(setTask(null));
      dispatch(setAssignedJobId(null));
    } else {
      throw new Error('Submit unsuccessful');
    }
  } catch (err) {
    dispatch(setError(err.toString()));
  }
};

export const login = () => async (dispatch) => {
  try {
    const { web3 } = store.getState();
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

// const unexpectedEventError = new Error('Unexpected event');

export const withdrawPayments = () => async (dispatch) => {
  try {
    const res = await apiRequest('/withdraw', 'POST');
    if (!res.ok) {
      throw new Error('Error withdrawing');
    }
    const data = await res.json();
    dispatch(setWorker(data.worker));
    // const { web3, worker } = store.getState();
    //
    // // extra check that metamask account matches state
    // const account = web3.eth.accounts[0];
    // if (account.slice(2) !== worker.id) {
    //   throw new Error('Incorrect user');
    // }
    //
    // const jobContract = contract(jobArtifacts);
    // jobContract.setProvider(web3.currentProvider);
    // jobContract.defaults({
    //   from: account,
    //   gas: 800000,
    // });
    //
    // const jobInstance = await jobContract.deployed();
    // const result = await jobInstance.payoutValue(account, worker.balance);
    // console.dir(result);
    //
    // if (result.logs.length !== 1) {
    //   throw unexpectedEventError;
    // }
    // const log = result.logs[0];
    // if (log.event !== 'Payout') {
    //   throw unexpectedEventError;
    // }
    // const logArgs = log.args;
    // if (logArgs.worker !== account || logArgs.value.toNumber() !== worker.balance) {
    //   throw unexpectedEventError;
    // }
  } catch (err) {
    dispatch(setError(err.toString()));
  }
};
