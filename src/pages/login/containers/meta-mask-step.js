import { connect } from 'react-redux';
import { onLogin } from '../../../actions/auth';
import Step from '../components/meta-mask-step';

const mapStateToProps = state => ({
  isLoading: state.auth.isLoggingIn,
});

const mapDispatchToProps = { onLogin };

export default connect(mapStateToProps, mapDispatchToProps)(Step);
