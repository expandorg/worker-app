import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { calculateVerificationScore, moduleControls } from '@expandorg/modules';

import { requestStateProps } from '@expandorg/app-utils';

import ModulesForm from './ModulesForm';

import { verifyResponse } from '../../sagas/responsesSagas';

import { makeVerficationVarsSelector } from '../../selectors/responsesSelectors';
import { verifyResponseStateSelector } from '../../selectors/uiStateSelectors';

import { jobProps, taskProps, assignmentProps } from '../shared/propTypes';

const makeMapStateToProps = () => {
  const varsSelector = makeVerficationVarsSelector();
  return (state, props) => ({
    variables: varsSelector(state, props.task, props.assignment),
    verifyState: verifyResponseStateSelector(state),
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

    verifyState: requestStateProps.isRequired,
    verifyResponse: PropTypes.func.isRequired,
  };

  static defaultProps = {
    variables: null,
    job: null,
    task: null,
  };

  handleSubmit = result => {
    const { job, assignment } = this.props;
    const score = calculateVerificationScore(
      result,
      job.verificationForm.modules,
      moduleControls
    );

    this.props.verifyResponse(assignment.responseId, score);
  };

  render() {
    const { verifyState, assignment, job, task, variables } = this.props;

    return (
      <ModulesForm
        assignment={assignment}
        form={job && job.verificationForm}
        visible={!!(job && task)}
        variables={variables}
        submitState={verifyState}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(Task);
