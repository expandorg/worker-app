import { createReducer } from 'redux-act';
import { onWeb3StateChange } from '../actions/web3';

export default createReducer({
  [onWeb3StateChange]: (state, payload = {}) => ({
    ...state,
    ...payload,
  }),
}, {
  installed: null,
  locked: true,
});
