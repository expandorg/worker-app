import { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { RequestStates } from '../../common/app/requestUiState';

import { requestStateProps, historyProps } from './propTypes';

import { assignJobStateSelector } from '../../selectors/uiStateSelectors';

const mapStateToProps = state => ({
  submitState: assignJobStateSelector(state),
});

class AssignedJobRedirect extends Component {
  static propTypes = {
    history: PropTypes.shape(historyProps).isRequired,
    submitState: PropTypes.shape(requestStateProps).isRequired,
  };

  componentDidUpdate({ submitState: prev }) {
    const { submitState, history } = this.props;
    if (
      prev.state === RequestStates.Fetching &&
      submitState.state === RequestStates.Fetched
    ) {
      history.push(`/tasks/${submitState.payload.result.newAssignment.taskId}`);
    }
  }

  render() {
    return null;
  }
}

export default withRouter(connect(mapStateToProps)(AssignedJobRedirect));
