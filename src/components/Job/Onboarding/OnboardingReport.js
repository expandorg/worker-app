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

import { reportOnboardingStateSelector } from '../../../selectors/uiStateSelectors';
import { reportOnboarding } from '../../../sagas/onboardingSagas';

const mapStateToProps = state => ({
  reportState: reportOnboardingStateSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ reportOnboarding }, dispatch);

class OnboardingReport extends Component {
  static propTypes = {
    jobId: PropTypes.number.isRequired,
    reasons: PropTypes.arrayOf(PropTypes.string).isRequired,
    report: PropTypes.string,

    reportState: requestStateProps.isRequired,

    reportOnboarding: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
  };

  static defaultProps = {
    report: null,
  };

  handleReport = (reason, message) => {
    const { jobId } = this.props;
    this.props.reportOnboarding(jobId, reason, message);
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OnboardingReport);
