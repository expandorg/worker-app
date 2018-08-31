import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Form,
  Module,
  formProps,
  FormDataProvider,
} from '@gemsorg/components/modules';

import { requestStateProps } from '../shared/propTypes';
import { RequestStates } from '../../common/app/requestUiState';

import styles from './TaskForm.module.styl';

export default class TaskForm extends Component {
  static propTypes = {
    form: formProps.isRequired,
    taskData: PropTypes.object, // eslint-disable-line
    contextData: PropTypes.any, // eslint-disable-line
    submitState: PropTypes.shape(requestStateProps).isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    taskData: null,
    contextData: null,
  };

  handleSubmit = values => {
    const { onSubmit } = this.props;
    onSubmit(values);
  };

  render() {
    const { submitState, form, contextData, taskData } = this.props;
    return (
      <FormDataProvider formData={contextData}>
        <Form
          form={form}
          variables={taskData}
          className={styles.form}
          errors={submitState.error}
          isSubmitting={submitState.state === RequestStates.Fetching}
          onSubmit={this.handleSubmit}
        >
          {props => <Module {...props} />}
        </Form>
      </FormDataProvider>
    );
  }
}
