import { connect } from 'react-redux';
import AddEmailModal from './AddEmailModal';

import { setEmail } from '../../../sagas/userSagas';

const mapStateToProps = () => ({
});

const mapDispatchToProps = {
  setEmail,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEmailModal);
