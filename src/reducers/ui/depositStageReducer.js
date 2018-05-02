import { gemsActionTypes } from '../../sagas/actionTypes';

export default function depositStageReducer(state = 0, action) {
  switch (action.type) {
    case gemsActionTypes.DEPOSIT:
      return 1;
    case gemsActionTypes.DEPOSIT_STAGE:
      return action.payload;
    case gemsActionTypes.DEPOSIT_COMPLETE:
    case gemsActionTypes.DEPOSIT_FAILED:
      return 0;
    default:
      break;
  }
  return state;
}
