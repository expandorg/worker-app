import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import withSubmitState from '../hoc/withSubmitState';
import { authenticated } from '../hoc/authRules';

import Content from '../shared/Content';
import Form from './form/Form';
import SubmissionDialog from './SubmissionDialog';

import { taskProps, requestStateProps } from '../shared/propTypes';
import { submitTask, fetchTask } from '../../sagas/tasksSagas';

import { isFundedSelector } from '../../selectors/userSelectors';
import { makeTaskSelector } from '../../selectors/tasksSelectors';
import { submitTaskStateSelector } from '../../selectors/uiStateSelectors';

import { RequestStates } from '../../common/app/requestUiState';

const makeMapStateToProps = () => {
  const taskSelector = makeTaskSelector();
  return (state, props) => ({
    taskId: props.match.params.taskId,
    task: taskSelector(state, props.match.params.taskId),
    isFunded: isFundedSelector(state),
  });
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ submitTask, fetchTask }, dispatch);

class Task extends Component {
  static propTypes = {
    taskId: PropTypes.string.isRequired,
    isFunded: PropTypes.bool.isRequired,
    task: PropTypes.shape(taskProps),
    submitState: PropTypes.shape(requestStateProps).isRequired,

    submitTask: PropTypes.func.isRequired,
    fetchTask: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    task: null,
  };

  componentDidMount() {
    this.props.fetchTask(this.props.taskId);
  }

  handleSubmit = (form, rules) => {
    const { task, onSubmit } = this.props;
    onSubmit(() => this.props.submitTask(task.id, form, rules));
  }

  render() {
    const { isFunded, submitState, task } = this.props;
    return (
      <Content title="Question writing and fact checking">
        {task &&
          <Form task={task} submitState={submitState} onSubmit={this.handleSubmit} />
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
