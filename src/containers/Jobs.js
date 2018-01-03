import { connect } from 'react-redux';
import Jobs from '../components/Jobs';
import { assignTask, fetchJobs, setTitle } from '../action-creators';

const mapStateToProps = state => ({
  assignedJobId: state.assignedJobId,
  jobs: state.jobs,
});

const mapDispatchToProps = {
  assignTask,
  fetchJobs,
  setTitle,
};

export default connect(mapStateToProps, mapDispatchToProps)(Jobs);
