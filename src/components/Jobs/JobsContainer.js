import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Jobs from './Jobs';

import { fetchJobs } from '../../sagas/jobsSagas';
import { setIsJoined } from '../../sagas/tasksSagas';

import { workerSelector, statsSelector } from '../../selectors/userSelectors';
import { jobsSelector } from '../../selectors/jobsSelectors';

const mapStateToProps = state => ({
  jobs: jobsSelector(state),
  worker: workerSelector(state),
  stats: statsSelector(state),
});

const mapDispatchToProps = {
  setIsJoined, fetchJobs,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Jobs));
