import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import Task from '../components/Task';
import { assignTask, setPreviousJobId, setTitle, submitTask } from '../action-creators';

const mapStateToProps = state => ({
  jobs: state.jobs,
  previousJobId: state.previousJobId,
  task: state.task,
});

const mapDispatchToProps = {
  assignTask,
  replace,
  setPreviousJobId,
  setTitle,
  submitTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);
