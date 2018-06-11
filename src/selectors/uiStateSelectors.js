import { createSelector } from 'reselect';

export const uiStateSelector = state => state.ui;


export const authStateSelector = createSelector(uiStateSelector, state => state.auth);
export const loginStateSelector = createSelector(uiStateSelector, state => state.login);
export const signupStateSelector = createSelector(uiStateSelector, state => state.signup);

export const loginMetamaskStateSelector = createSelector(
  uiStateSelector,
  state => state.loginMetamask,
);

export const signupMetamaskStateSelector = createSelector(
  uiStateSelector,
  state => state.signupMetamask,
);


export const assignAddressStateSelector = createSelector(
  uiStateSelector,
  state => state.assignAddress,
);

export const editEmailStateSelector = createSelector(
  uiStateSelector,
  state => state.editEmail,
);

export const confirmEmailStateSelector = createSelector(
  uiStateSelector,
  state => state.confirmEmail,
);

export const resendConfirmEmailStateSelector = createSelector(
  uiStateSelector,
  state => state.resendConfirmEmail,
);

export const assignJobStateSelector = createSelector(uiStateSelector, state => state.assignJob);

export const submitTaskStateSelector = createSelector(uiStateSelector, state => state.submitTask);


export const depositStateSelector = createSelector(uiStateSelector, state => state.deposit);

export const depositStageSelector = createSelector(uiStateSelector, state => state.depositStage);

export const questionStateSelector = createSelector(uiStateSelector, state => state.fetchQuestion);

export const answersStateSelector = createSelector(uiStateSelector, state => state.fetchAnswer);

export const startTestStateSelector = createSelector(uiStateSelector, state => state.startTest);

export const postAnswerStateSelector = createSelector(uiStateSelector, state => state.postAnswer);

export const cancelTestStateSelector = createSelector(uiStateSelector, state => state.cancelTest);

export const withdrawStateSelector = createSelector(uiStateSelector, state => state.withdraw);
