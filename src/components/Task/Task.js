import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { requestStateProps } from '@expandorg/app-utils';

import withSubmitState from '../hoc/withSubmitState';

import TaskFrom from './TaskFrom';

import { submitTask } from '../../sagas/tasksSagas';

import { submitTaskStateSelector } from '../../selectors/uiStateSelectors';

import { jobProps, taskProps, assignmentProps } from '../shared/propTypes';

const mapDispatchToProps = dispatch =>
  bindActionCreators({ submitTask }, dispatch);

class Task extends Component {
  static propTypes = {
    assignment: assignmentProps.isRequired,
    job: jobProps,
    task: taskProps,

    submitState: requestStateProps.isRequired,

    submitTask: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onResetSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    job: null,
    task: null,
  };

  handleSubmit = form => {
    const { assignment, onSubmit } = this.props;
    onSubmit(() => this.props.submitTask(assignment.taskId, form));
  };

  render() {
    const { submitState, job, task, assignment, onResetSubmit } = this.props;

    return (
      <TaskFrom
        assignment={assignment}
        form={job && job.taskForm}
        visible={!!(job && task)}
        variables={task && task.taskData}
        submitState={submitState}
        onSubmit={this.handleSubmit}
        onResetSubmit={onResetSubmit}
      />
    );
  }
}

export default withSubmitState(submitTaskStateSelector)(
  connect(
    null,
    mapDispatchToProps
  )(Task)
);
