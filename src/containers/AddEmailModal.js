import { connect } from 'react-redux';
import AddEmailModal from '../components/AddEmailModal';
import { setEmail } from '../actions/action-creators';

const mapStateToProps = state => ({
  error: state.error,
});

const mapDispatchToProps = {
  setEmail,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEmailModal);
