import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import Confirm from '../components/Confirm';
import { confirmEmail, resendConfirmEmail } from '../action-creators';

const mapStateToProps = state => ({
  error: state.error,
  worker: state.worker,
});

const mapDispatchToProps = {
  confirmEmail,
  resendConfirmEmail,
  replace,
};

export default connect(mapStateToProps, mapDispatchToProps)(Confirm);
