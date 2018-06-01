import { connect } from 'react-redux';
import ConfirmEmailModal from './ConfirmEmailModal';

import { confirmEmail, resendConfirmEmail } from '../../../sagas/userSagas';
import { userSelector } from '../../../selectors/userSelectors';

const mapStateToProps = state => ({
  user: userSelector(state),
});

const mapDispatchToProps = {
  confirmEmail,
  resendConfirmEmail,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmEmailModal);
