import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Jobs from './Jobs';
import { setIsJoined } from '../../actions/action-creators';
import { errorSelector } from '../../selectors/uiStateSelectors';

const mapStateToProps = state => ({
  worker: state.worker,
  stats: state.stats,
  error: errorSelector(state),
});

const mapDispatchToProps = {
  setIsJoined,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Jobs));
