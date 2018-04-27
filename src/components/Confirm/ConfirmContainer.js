import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Confirm from './Confirm';
import { confirmEmail, resendConfirmEmail } from '../../actions/action-creators';

const mapStateToProps = state => ({
  error: state.error,
  worker: state.worker,
});

const mapDispatchToProps = {
  confirmEmail,
  resendConfirmEmail,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Confirm));
