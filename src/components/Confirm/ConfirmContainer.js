import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Confirm from './Confirm';
import { confirmEmail, resendConfirmEmail } from '../../actions/email-action-creators';
import { errorSelector } from '../../selectors/uiStateSelectors';

const mapStateToProps = state => ({
  error: errorSelector(state),
  worker: state.worker,
});

const mapDispatchToProps = {
  confirmEmail,
  resendConfirmEmail,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Confirm));
