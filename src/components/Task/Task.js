import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import withSubmitState from '../hoc/withSubmitState';
import { authenticated } from '../hoc/authRules';

import Content from '../shared/Content';
import Form from './form/Form';
import SubmissionDialog from './SubmissionDialog';

import { submitTask, fetchTask } from '../../sagas/tasksSagas';
import { fetchJobs } from '../../sagas/jobsSagas';

import { isFundedSelector } from '../../selectors/userSelectors';
import { makeTaskFormSelector } from '../../selectors/jobsSelectors';

import { submitTaskStateSelector } from '../../selectors/uiStateSelectors';

import { taskFormProps, requestStateProps } from '../shared/propTypes';
import { RequestStates } from '../../common/app/requestUiState';

const makeMapStateToProps = () => {
  const taskFormSelector = makeTaskFormSelector();
  return (state, props) => ({
    taskId: props.match.params.taskId,
    taskForm: taskFormSelector(state, props.match.params.taskId),
    isFunded: isFundedSelector(state),
  });
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ submitTask, fetchTask, fetchJobs }, dispatch);

class Task extends Component {
  static propTypes = {
    taskId: PropTypes.string.isRequired,
    isFunded: PropTypes.bool.isRequired,
    taskForm: PropTypes.shape(taskFormProps),
    submitState: PropTypes.shape(requestStateProps).isRequired,

    submitTask: PropTypes.func.isRequired,
    fetchJobs: PropTypes.func.isRequired,
    fetchTask: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    taskForm: null,
  };

  componentDidMount() {
    this.props.fetchJobs();
    this.props.fetchTask(this.props.taskId);
  }

  handleSubmit = (form, rules) => {
    const { taskId, onSubmit } = this.props;
    onSubmit(() => this.props.submitTask(taskId, form, rules));
  }

  render() {
    const {
      isFunded, submitState, taskForm,
    } = this.props;
    return (
      <Content title="Question writing and fact checking">
        {taskForm &&
          <Form
            taskForm={taskForm}
            submitState={submitState}
            onSubmit={this.handleSubmit}
          />
        }
        {submitState.state === RequestStates.Fetched &&
          <SubmissionDialog isFunded={isFunded} />
        }
      </Content>
    );
  }
}

export default authenticated(
  withSubmitState(submitTaskStateSelector)(
    connect(makeMapStateToProps, mapDispatchToProps)(Task),
  ),
);
