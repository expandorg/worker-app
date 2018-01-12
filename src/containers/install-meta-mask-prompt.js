import { connect } from 'react-redux';
import Prompt from '../components/install-meta-mask-prompt';

const mapStateToProps = state => ({
  isShown: state.web3.installed === false,
});

export default connect(mapStateToProps)(Prompt);
