import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from '@expandorg/components';
import { ReportToggle, formProps } from '@expandorg/modules';
import { moduleControls } from '@expandorg/modules/app';

import AssignmentReport from './AssignmentReport';
import CancelAssignmentDialog from './CancelAssignmentDialog';

import styles from './Actions.module.styl';

export default class Actions extends Component {
  static propTypes = {
    assignmentId: PropTypes.number.isRequired,
    form: formProps.isRequired,
    reportMessage: PropTypes.string,
  };

  static defaultProps = {
    reportMessage: null,
  };

  state = {
    cancel: false,
  };

  handleToggleCancel = () => {
    this.setState(({ cancel }) => ({ cancel: !cancel }));
  };

  render() {
    const { reportMessage, form, assignmentId } = this.props;
    const { cancel } = this.state;
    return (
      <div className={styles.actions}>
        <ReportToggle form={form} controls={moduleControls}>
          {({ onHide, reasons }) => (
            <AssignmentReport
              assignmentId={assignmentId}
              reasons={reasons}
              report={reportMessage}
              onHide={onHide}
            />
          )}
        </ReportToggle>
        <Button
          onClick={this.handleToggleCancel}
          theme="link"
          className={styles.cancel}
        >
          cancel
        </Button>
        {cancel && (
          <CancelAssignmentDialog
            assignmentId={assignmentId}
            onHide={this.handleToggleCancel}
          />
        )}
      </div>
    );
  }
}
