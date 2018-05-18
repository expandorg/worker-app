import { connect } from 'react-redux';

import Jobs from './Jobs';

import { authenticated } from '../hoc/authRules';

import { fetchJobs } from '../../sagas/jobsSagas';
import { setIsJoined } from '../../sagas/tasksSagas';

import { userSelector, statsSelector } from '../../selectors/userSelectors';
import { jobsSelector } from '../../selectors/jobsSelectors';

const mapStateToProps = state => ({
  jobs: jobsSelector(state),
  worker: userSelector(state),
  stats: statsSelector(state),
});

const mapDispatchToProps = {
  setIsJoined, fetchJobs,
};

export default authenticated(connect(mapStateToProps, mapDispatchToProps)(Jobs));
