import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ReportForm } from '@expandorg/modules';

import {
  RequestStates,
  requestStateProps,
  SubmitStateEffect,
} from '@expandorg/app-utils';

import { reportAssignmentStateSelector } from '../../../selectors/ui';
import { reportAssignment } from '../../../sagas/assignmentsSagas';

const mapStateToProps = (state) => ({
  reportState: reportAssignmentStateSelector(state),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ reportAssignment }, dispatch);

class AssignmentReport extends Component {
  static propTypes = {
    assignmentId: PropTypes.number.isRequired,
    reasons: PropTypes.arrayOf(PropTypes.string).isRequired,
    report: PropTypes.string,

    reportState: requestStateProps.isRequired,

    reportAssignment: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
  };

  static defaultProps = {
    report: null,
  };

  handleReport = (reason, message) => {
    const { assignmentId } = this.props;
    this.props.reportAssignment(assignmentId, reason, message);
  };

  render() {
    const { report, reasons, onHide, reportState } = this.props;
    const isReporting = reportState.state === RequestStates.Fetching;
    return (
      <>
        <ReportForm
          onHide={onHide}
          reasons={reasons}
          report={report}
          error={reportState.error}
          isReporting={isReporting}
          onReport={this.handleReport}
        />
        <SubmitStateEffect submitState={reportState} onComplete={onHide} />
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentReport);
