import { actions } from '../../actions/action-types';

export default function depositStageReducer(state = 0, action) {
  switch (action.type) {
    case actions.SET_DEPOSIT_STAGE:
      return action.payload;
    default:
      break;
  }
  return state;
}
