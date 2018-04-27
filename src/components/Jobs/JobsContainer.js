import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Jobs from './Jobs';
import { setIsJoined } from '../../actions/action-creators';

const mapStateToProps = state => ({
  worker: state.worker,
  stats: state.stats,
  error: state.error,
});

const mapDispatchToProps = {
  setIsJoined,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Jobs));
