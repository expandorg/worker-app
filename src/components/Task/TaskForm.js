import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
  };

  static defaultProps = {
    taskData: null,
    contextData: null,
  };

  state = {
    reportMessage: null,
  };

  handleSubmit = values => {
    const { onSubmit } = this.props;
    onSubmit(values);
  };

  handleModuleError = reportMessage => {
    this.setState({ reportMessage });
  };

  render() {
    const { submitState, form, contextData, taskData, onReport } = this.props;
    const { reportMessage } = this.state;
    return (
      <FormDataProvider formData={contextData}>
        <div className={styles.report}>
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
        </div>
        <Form
          form={form}
          variables={taskData}
          className={styles.form}
          errors={submitState.error}
          isSubmitting={submitState.state === RequestStates.Fetching}
          onSubmit={this.handleSubmit}
          onModuleError={this.handleModuleError}
        >
          {props => <Module {...props} />}
        </Form>
      </FormDataProvider>
    );
  }
}
