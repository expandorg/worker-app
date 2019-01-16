import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Button } from '@expandorg/components';
import { ReportToggle, formProps } from '@expandorg/modules';

import withSubmitState from '../../hoc/withSubmitState';

import Report from '../../shared/Report';
import CancelConfirmationDialog from './CancelConfirmationDialog';

import {
  reportAssignment,
  cancelAssignment,
} from '../../../sagas/assignmentsSagas';

import { reportAssignmentStateSelector } from '../../../selectors/uiStateSelectors';

import styles from './TaskActions.module.styl';

const ReportAssignment = withSubmitState(reportAssignmentStateSelector)(Report);

const mapDispatchToProps = dispatch =>
  bindActionCreators({ reportAssignment, cancelAssignment }, dispatch);

class TaskActions extends Component {
  static propTypes = {
    assignmentId: PropTypes.number.isRequired,
    form: formProps.isRequired,
    reportMessage: PropTypes.string,
    reportAssignment: PropTypes.func.isRequired,
    cancelAssignment: PropTypes.func.isRequired,
  };

  static defaultProps = {
    reportMessage: null,
  };

  state = {
    cancelDialog: false,
  };

  handleReport = (reason, message) => {
    const { assignmentId } = this.props;
    this.props.reportAssignment(assignmentId, reason, message);
  };

  handleToggleCancel = () => {
    this.setState(({ cancelDialog }) => ({ cancelDialog: !cancelDialog }));
  };

  render() {
    const { reportMessage, form, assignmentId } = this.props;
    const { cancelDialog } = this.state;
    return (
      <div className={styles.actions}>
        <ReportToggle form={form}>
          {({ onHide, reasons }) => (
            <ReportAssignment
              onHide={onHide}
              reasons={reasons}
              report={reportMessage}
              onReport={this.handleReport}
            />
          )}
        </ReportToggle>
        <Button
          onClick={this.handleToggleCancel}
          size="small"
          theme="white"
          className={styles.cancel}
        >
          cancel
        </Button>
        {cancelDialog && (
          <CancelConfirmationDialog
            assignmentId={assignmentId}
            onCancel={this.props.cancelAssignment}
            onHide={this.handleToggleCancel}
          />
        )}
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(TaskActions);
