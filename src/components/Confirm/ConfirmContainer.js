import { connect } from 'react-redux';

import Confirm from './Confirm';

import { authenticated } from '../hoc/authRules';

import { confirmEmail, resendConfirmEmail } from '../../sagas/userSagas';

import { errorSelector } from '../../selectors/uiStateSelectors';
import { userSelector } from '../../selectors/userSelectors';

const mapStateToProps = state => ({
  error: errorSelector(state),
  worker: userSelector(state),
});

const mapDispatchToProps = {
  confirmEmail,
  resendConfirmEmail,
};

export default authenticated(connect(mapStateToProps, mapDispatchToProps)(Confirm));
