import { connect } from 'react-redux';
import ConfirmEmailModal from './ConfirmEmailModal';

import { confirmEmail, resendConfirmEmail } from '../../../actions/action-creators';

const mapStateToProps = state => ({
  error: state.error,
});

const mapDispatchToProps = {
  confirmEmail,
  resendConfirmEmail,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmEmailModal);
