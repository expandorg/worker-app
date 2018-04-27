import { userApi } from '../api/UserApi';

import { setWorker, setError } from './action-creators';


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
