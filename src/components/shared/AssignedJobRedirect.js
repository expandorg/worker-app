import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  requestStateProps,
  historyProps,
  SubmitStateEffect,
} from '@expandorg/app-utils';

import { assignmentProps } from './propTypes';
import { assignJobStateSelector } from '../../selectors/ui';
import { makeJobAssignmentSelector } from '../../selectors/assignmentsSelectors';

const makeMapStateToProps = () => {
  const assignmentSelector = makeJobAssignmentSelector();
  return (state, props) => ({
    assignment: assignmentSelector(state, props.jobId),
    submitState: assignJobStateSelector(state),
  });
};

class AssignedJobRedirect extends Component {
  static propTypes = {
    assignment: assignmentProps,
    history: historyProps.isRequired,
    replace: PropTypes.bool,
    submitState: requestStateProps.isRequired,
  };

  static defaultProps = {
    assignment: null,
    replace: false,
  };

  componentDidMount() {
    const { assignment } = this.props;
    if (assignment) {
      this.move(assignment.taskId);
    }
  }

  handleAssignComplete = (submitState) => {
    this.move(submitState.payload.result.newAssignment.taskId);
  };

  move(taskId) {
    const { history, replace } = this.props;

    const url = `/tasks/${taskId}`;
    if (replace) {
      history.replace(url);
    } else {
      history.push(url);
    }
  }

  render() {
    const { submitState } = this.props;
    return (
      <SubmitStateEffect
        submitState={submitState}
        onComplete={this.handleAssignComplete}
      />
    );
  }
}

export default withRouter(connect(makeMapStateToProps)(AssignedJobRedirect));
