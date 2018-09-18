import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ReportForm } from '@gemsorg/components/modules';

import { RequestStates, requestStateProps } from '@gemsorg/app-utils';

export default class Report extends Component {
  static propTypes = {
    report: PropTypes.string,
    reasons: PropTypes.arrayOf(PropTypes.string).isRequired,
    submitState: requestStateProps.isRequired,
    onHide: PropTypes.func.isRequired,
    onReport: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    report: null,
  };

  handleReport = (reason, value) => {
    const { onSubmit, onReport } = this.props;
    onSubmit(() => onReport(reason, value));
  };

  render() {
    const { report, reasons, onHide, submitState } = this.props;
    const isReporting = submitState.state === RequestStates.Fetched;
    return (
      <ReportForm
        onHide={onHide}
        reasons={reasons}
        report={report}
        error={submitState.error}
        isReporting={isReporting}
        onReport={this.handleReport}
      />
    );
  }
}
