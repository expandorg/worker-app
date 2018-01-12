import { connect } from 'react-redux';
import Modal from '../components/meta-mask-modal';

const mapStateToProps = state => ({
  isShown: state.web3.locked,
});

export default connect(mapStateToProps)(Modal);
