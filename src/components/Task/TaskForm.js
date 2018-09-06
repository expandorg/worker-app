import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from '@gemsorg/components';

import {
  Form,
  Module,
  formProps,
  FormDataProvider,
  ReportToggle,
} from '@gemsorg/components/modules';

import { requestStateProps } from '../shared/propTypes';
import { RequestStates } from '../../common/app/requestUiState';

import Report from '../shared/Report';

import withSubmitState from '../hoc/withSubmitState';
import { reportTaskStateSelector } from '../../selectors/uiStateSelectors';

import styles from './TaskForm.module.styl';

const ReportTask = withSubmitState(reportTaskStateSelector)(Report);

export default class TaskForm extends Component {
  static propTypes = {
    form: formProps.isRequired,
    taskData: PropTypes.object, // eslint-disable-line
    contextData: PropTypes.any, // eslint-disable-line
    submitState: PropTypes.shape(requestStateProps).isRequired,
    onSubmit: PropTypes.func.isRequired,
    onReport: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  static defaultProps = {
    taskData: null,
    contextData: null,
  };

  state = {
    reportMessage: null,
  };

  handleModuleError = reportMessage => {
    this.setState({ reportMessage });
  };

  render() {
    const {
      submitState,
      form,
      contextData,
      taskData,
      onReport,
      onSubmit,
      onCancel,
    } = this.props;
    const { reportMessage } = this.state;
    return (
      <FormDataProvider formData={contextData}>
        <div className={styles.actions}>
          <ReportToggle form={form}>
            {({ onHide, reasons }) => (
              <ReportTask
                onHide={onHide}
                reasons={reasons}
                report={reportMessage}
                onReport={onReport}
              />
            )}
          </ReportToggle>
          <Button
            onClick={onCancel}
            size="small"
            theme="white"
            className={styles.cancel}
          >
            cancel
          </Button>
        </div>
        <Form
          form={form}
          variables={taskData}
          className={styles.form}
          errors={submitState.error}
          isSubmitting={submitState.state === RequestStates.Fetching}
          onSubmit={onSubmit}
          onModuleError={this.handleModuleError}
        >
          {props => <Module {...props} />}
        </Form>
      </FormDataProvider>
    );
  }
}
