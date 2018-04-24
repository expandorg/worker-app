import { connect } from 'react-redux';
import Requester from '../components/Requester';
import { setTitle } from '../actions/action-creators';

const mapDispatchToProps = {
  setTitle,
};

export default connect(null, mapDispatchToProps)(Requester);
