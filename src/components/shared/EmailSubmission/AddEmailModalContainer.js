import { connect } from 'react-redux';
import AddEmailModal from './AddEmailModal';

import { setEmail } from '../../../actions/email-action-creators';
import { errorSelector } from '../../../selectors/uiStateSelectors';

const mapStateToProps = state => ({
  error: errorSelector(state),
});

const mapDispatchToProps = {
  setEmail,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEmailModal);
