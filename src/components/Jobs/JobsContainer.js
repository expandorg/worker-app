import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Jobs from './Jobs';

import { setIsJoined } from '../../sagas/tasksSagas';
import { workerSelector, statsSelector } from '../../selectors/userSelectors';

const mapStateToProps = state => ({
  worker: workerSelector(state),
  stats: statsSelector(state),
});

const mapDispatchToProps = {
  setIsJoined,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Jobs));
