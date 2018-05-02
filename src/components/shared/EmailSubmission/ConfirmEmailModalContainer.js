import { connect } from 'react-redux';
import ConfirmEmailModal from './ConfirmEmailModal';

import { confirmEmail, resendConfirmEmail } from '../../../sagas/userSagas';
import { errorSelector } from '../../../selectors/uiStateSelectors';

const mapStateToProps = state => ({
  error: errorSelector(state),
});

const mapDispatchToProps = {
  confirmEmail,
  resendConfirmEmail,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmEmailModal);
