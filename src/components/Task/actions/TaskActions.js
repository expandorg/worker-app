import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Button } from '@gemsorg/components';
import { ReportToggle, formProps } from '@gemsorg/components/modules';

import withSubmitState from '../../hoc/withSubmitState';

import Report from '../../shared/Report';
import CancelConfirmationDialog from './CancelConfirmationDialog';

import { reportTask, cancelTask } from '../../../sagas/tasksSagas';

import { reportTaskStateSelector } from '../../../selectors/uiStateSelectors';

import styles from './TaskActions.module.styl';

const ReportTask = withSubmitState(reportTaskStateSelector)(Report);

const mapDispatchToProps = dispatch =>
  bindActionCreators({ reportTask, cancelTask }, dispatch);

class TaskActions extends Component {
  static propTypes = {
    taskId: PropTypes.number.isRequired,
    form: formProps.isRequired,
    reportMessage: PropTypes.string,
    reportTask: PropTypes.func.isRequired,
  };

  static defaultProps = {
    reportMessage: null,
  };

  state = {
    cancelDialog: false,
  };

  handleReport = (reason, message) => {
    const { taskId } = this.props;
    this.props.reportTask(taskId, reason, message);
  };

  handleToggleCancel = () => {
    this.setState(({ cancelDialog }) => ({ cancelDialog: !cancelDialog }));
  };

  render() {
    const { reportMessage, form, taskId } = this.props;
    const { cancelDialog } = this.state;
    return (
      <div className={styles.actions}>
        <ReportToggle form={form}>
          {({ onHide, reasons }) => (
            <ReportTask
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
            taskId={taskId}
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
