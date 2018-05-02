import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Confirm from './Confirm';
import { confirmEmail, resendConfirmEmail } from '../../sagas/userSagas';

import { errorSelector } from '../../selectors/uiStateSelectors';
import { workerSelector } from '../../selectors/userSelectors';

const mapStateToProps = state => ({
  error: errorSelector(state),
  worker: workerSelector(state),
});

const mapDispatchToProps = {
  confirmEmail,
  resendConfirmEmail,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Confirm));
