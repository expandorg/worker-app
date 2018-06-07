import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Content from '../shared/Content';

import Form from './form/Form';
import SubmissionDialog from './SubmissionDialog';

import { taskProps, requestStateProps } from '../shared/propTypes';
import { submitTask, fetchTask } from '../../sagas/tasksSagas';

import { isFundedSelector } from '../../selectors/userSelectors';
import { makeTaskSelector } from '../../selectors/tasksSelector';
import { submitTaskStateSelector } from '../../selectors/uiStateSelectors';

import { RequestStates, initialState as initialRequestState } from '../../common/app/requestUiState';

import { authenticated } from '../hoc/authRules';

const makeMapStateToProps = () => {
  const taskSelector = makeTaskSelector();
  return (state, props) => ({
    taskId: props.match.params.taskId,
    task: taskSelector(state, props.match.params.taskId),
    submitState: submitTaskStateSelector(state),
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
  };

  static defaultProps = {
    task: null,
  };

  state = {
    submitState: initialRequestState,
    submitted: false,
  }

  componentDidMount() {
    this.props.fetchTask(this.props.taskId);
  }

  componentWillReceiveProps({ submitState }) {
    if (this.state.submitted) {
      this.setState({ submitState });
    }
  }

  handleSubmit = (form, rules) => {
    this.setState({ submitted: true },
      () => this.props.submitTask(this.props.task.id, form, rules),
    );
  }

  render() {
    const { isFunded, task } = this.props;
    const { submitState } = this.state;
    return (
      <Content title="Question writing and fact checking">
        {task &&
          <Form
            task={task}
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

export default authenticated(connect(makeMapStateToProps, mapDispatchToProps)(Task));
