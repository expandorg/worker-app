import { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { RequestStates, requestStateProps } from '@gemsorg/app-utils';

import { historyProps, assignmentProps } from './propTypes';

import { assignJobStateSelector } from '../../selectors/uiStateSelectors';
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
    assignment: PropTypes.shape(assignmentProps),
    history: PropTypes.shape(historyProps).isRequired,
    replace: PropTypes.bool,
    submitState: requestStateProps.isRequired,
  };

  static defaultProps = {
    assignment: null,
    replace: false,
  };

  componentDidMount() {
    const { assignment, history, replace } = this.props;
    if (assignment) {
      const url = `/tasks/${assignment.taskId}`;
      if (replace) {
        history.replace(url);
      } else {
        history.push(url);
      }
    }
  }

  componentDidUpdate({ submitState: prev }) {
    const { submitState, history, replace } = this.props;
    if (
      prev.state === RequestStates.Fetching &&
      submitState.state === RequestStates.Fetched
    ) {
      const url = `/tasks/${submitState.payload.result.newAssignment.taskId}`;
      if (replace) {
        history.replace(url);
      } else {
        history.push(url);
      }
    }
  }

  render() {
    return null;
  }
}

export default withRouter(connect(makeMapStateToProps)(AssignedJobRedirect));
