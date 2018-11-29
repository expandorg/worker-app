import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { calculateVerificationScore, moduleControls } from '@gemsorg/modules';

import { requestStateProps } from '@gemsorg/app-utils';

import withSubmitState from '../hoc/withSubmitState';

import TaskFrom from './TaskFrom';

import { verifyResponse } from '../../sagas/responsesSagas';

import { makeVerficationVarsSelector } from '../../selectors/responsesSelectors';
import { verifyResponseStateSelector } from '../../selectors/uiStateSelectors';

import { jobProps, taskProps, assignmentProps } from '../shared/propTypes';

const makeMapStateToProps = () => {
  const varsSelector = makeVerficationVarsSelector();
  return (state, props) => ({
    variables: varsSelector(state, props.task, props.assignment),
  });
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ verifyResponse }, dispatch);

class Task extends Component {
  static propTypes = {
    assignment: assignmentProps.isRequired,
    job: jobProps,
    task: taskProps,
    variables: PropTypes.shape({}),

    submitState: requestStateProps.isRequired,

    verifyResponse: PropTypes.func.isRequired,

    onSubmit: PropTypes.func.isRequired,
    onResetSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    variables: null,
    job: null,
    task: null,
  };

  handleSubmit = result => {
    const { job, assignment, onSubmit } = this.props;
    const score = calculateVerificationScore(
      result,
      job.verificationForm.modules,
      moduleControls
    );
    onSubmit(() => this.props.verifyResponse(assignment.responseId, score));
  };

  render() {
    const {
      submitState,
      assignment,
      job,
      task,
      variables,
      onResetSubmit,
    } = this.props;

    return (
      <TaskFrom
        assignment={assignment}
        form={job && job.verificationForm}
        visible={!!(job && task)}
        variables={variables}
        submitState={submitState}
        onSubmit={this.handleSubmit}
        onResetSubmit={onResetSubmit}
      />
    );
  }
}

export default withSubmitState(verifyResponseStateSelector)(
  connect(
    makeMapStateToProps,
    mapDispatchToProps
  )(Task)
);
