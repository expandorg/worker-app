import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Form,
  Module,
  formProps,
  FormDataProvider,
} from '@gemsorg/components/modules';

import { RequestStates, requestStateProps } from '@gemsorg/app-utils';

import styles from './TaskForm.module.styl';

export default class TaskForm extends Component {
  static propTypes = {
    form: formProps.isRequired,
    taskData: PropTypes.object, // eslint-disable-line
    contextData: PropTypes.any, // eslint-disable-line
    submitState: requestStateProps.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onModuleError: PropTypes.func.isRequired,
  };

  static defaultProps = {
    taskData: null,
    contextData: null,
  };

  render() {
    const {
      submitState,
      form,
      contextData,
      taskData,
      onSubmit,
      onModuleError,
    } = this.props;
    return (
      <FormDataProvider formData={contextData}>
        <Form
          form={form}
          variables={taskData}
          className={styles.form}
          errors={submitState.error}
          isSubmitting={submitState.state === RequestStates.Fetching}
          onSubmit={onSubmit}
          onModuleError={onModuleError}
        >
          {props => <Module {...props} />}
        </Form>
      </FormDataProvider>
    );
  }
}
