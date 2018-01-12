import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import GCPTask from '../components/GCP-Task';
import { setTitle } from '../action-creators';

const mapDispatchToProps = {
  setTitle,
};

export default connect(null, mapDispatchToProps)(GCPTask);
