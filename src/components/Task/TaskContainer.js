import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { requestStateProps } from '@expandorg/app-utils';

import ModulesFrom from './ModulesForm';

import { submitTask } from '../../sagas/tasksSagas';

import { submitTaskStateSelector } from '../../selectors/ui';

import { jobProps, taskProps, assignmentProps } from '../shared/propTypes';

const mapStateToProps = state => ({
  submitTaskState: submitTaskStateSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ submitTask }, dispatch);

class TaskContainer extends Component {
  static propTypes = {
    assignment: assignmentProps.isRequired,
    job: jobProps,
    task: taskProps,
    submitTaskState: requestStateProps.isRequired,

    submitTask: PropTypes.func.isRequired,
  };

  static defaultProps = {
    job: null,
    task: null,
  };

  handleSubmit = form => {
    const { assignment } = this.props;
    this.props.submitTask(assignment.taskId, form);
  };

  render() {
    const { submitTaskState, job, task, assignment } = this.props;

    return (
      <ModulesFrom
        assignment={assignment}
        form={job && job.taskForm}
        visible={!!(job && task)}
        variables={task && task.taskData}
        submitState={submitTaskState}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskContainer);
