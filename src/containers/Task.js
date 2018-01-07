import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import Task from '../components/Task';
import { assignTask, setPreviousJobId, setTitle, submitTask, fetchAuth } from '../action-creators';

const mapStateToProps = state => ({
  jobs: state.jobs,
  previousJobId: state.previousJobId,
  task: state.task,
  stats: state.stats,
});

const mapDispatchToProps = {
  assignTask,
  replace,
  setPreviousJobId,
  setTitle,
  submitTask,
  fetchAuth,
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);
