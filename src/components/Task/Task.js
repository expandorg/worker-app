import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Panel } from '@gemsorg/components';

import withSubmitState from '../hoc/withSubmitState';
import { authenticated } from '../hoc/authRules';

import Content from '../shared/Content';
import TaskForm from './TaskForm';
import SubmissionDialog from './SubmissionDialog';

import { submitTask, fetchTask } from '../../sagas/tasksSagas';
import { fetchJobs } from '../../sagas/jobsSagas';

import { makeAssignedJobSelector } from '../../selectors/jobsSelectors';
import { makeTaskSelector } from '../../selectors/tasksSelectors';

import { submitTaskStateSelector } from '../../selectors/uiStateSelectors';

import { requestStateProps, jobProps, taskProps } from '../shared/propTypes';
import { RequestStates } from '../../common/app/requestUiState';

import styles from './Task.module.styl';

const makeMapStateToProps = () => {
  const assignedJobSelector = makeAssignedJobSelector();
  const taskSelector = makeTaskSelector();
  return (state, props) => ({
    taskId: props.match.params.taskId,
    task: taskSelector(state, props.match.params.taskId),
    job: assignedJobSelector(state, props.match.params.taskId),
  });
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ submitTask, fetchTask, fetchJobs }, dispatch);

class Task extends Component {
  static propTypes = {
    taskId: PropTypes.string.isRequired,
    job: PropTypes.shape(jobProps),
    task: PropTypes.shape(taskProps),
    submitState: PropTypes.shape(requestStateProps).isRequired,

    submitTask: PropTypes.func.isRequired,
    fetchJobs: PropTypes.func.isRequired,
    fetchTask: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    job: null,
    task: null,
  };

  componentDidMount() {
    const { taskId } = this.props;
    this.props.fetchJobs();
    this.props.fetchTask(taskId);
  }

  handleSubmit = form => {
    const { taskId, onSubmit } = this.props;
    onSubmit(() => this.props.submitTask(taskId, form));
  };

  render() {
    const { submitState, job, task } = this.props;
    return (
      <Content title={(job && job.name) || ''}>
        <Panel className={styles.container}>
          {job &&
            task && (
              <TaskForm
                form={job.taskForm}
                taskData={task.taskData}
                contextData={job}
                submitState={submitState}
                onSubmit={this.handleSubmit}
              />
            )}
        </Panel>
        {submitState.state === RequestStates.Fetched && <SubmissionDialog />}
      </Content>
    );
  }
}

export default authenticated(
  withSubmitState(submitTaskStateSelector)(
    connect(
      makeMapStateToProps,
      mapDispatchToProps
    )(Task)
  )
);
