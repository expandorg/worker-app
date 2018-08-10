import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Panel } from '@gemsorg/components';
import { formProps } from '@gemsorg/components/modules';

import withSubmitState from '../hoc/withSubmitState';
import { authenticated } from '../hoc/authRules';

import Content from '../shared/Content';
import TaskForm from './TaskForm';
import SubmissionDialog from './SubmissionDialog';

import { submitTask, fetchTask } from '../../sagas/tasksSagas';
import { fetchJobs } from '../../sagas/jobsSagas';

import { isFundedSelector } from '../../selectors/userSelectors';
import { makeTaskFormSelector } from '../../selectors/jobsSelectors';

import { submitTaskStateSelector } from '../../selectors/uiStateSelectors';

import { requestStateProps } from '../shared/propTypes';
import { RequestStates } from '../../common/app/requestUiState';

import styles from './Task.module.styl';

const makeMapStateToProps = () => {
  const taskFormSelector = makeTaskFormSelector();
  return (state, props) => ({
    taskId: props.match.params.taskId,
    form: taskFormSelector(state, props.match.params.taskId),
    isFunded: isFundedSelector(state),
  });
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ submitTask, fetchTask, fetchJobs }, dispatch);

class Task extends Component {
  static propTypes = {
    taskId: PropTypes.string.isRequired,
    isFunded: PropTypes.bool.isRequired,
    form: formProps,
    submitState: PropTypes.shape(requestStateProps).isRequired,

    submitTask: PropTypes.func.isRequired,
    fetchJobs: PropTypes.func.isRequired,
    fetchTask: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    form: null,
  };

  componentDidMount() {
    this.props.fetchJobs();
    this.props.fetchTask(this.props.taskId);
  }

  handleSubmit = (form) => {
    const { taskId, onSubmit } = this.props;
    onSubmit(() => this.props.submitTask(taskId, form));
  }

  render() {
    const {
      isFunded, submitState, form,
    } = this.props;
    return (
      <Content title="Question writing and fact checking">
        <Panel className={styles.container}>
          {form &&
            <TaskForm
              form={form}
              submitState={submitState}
              onSubmit={this.handleSubmit}
            />
          }
        </Panel>
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
