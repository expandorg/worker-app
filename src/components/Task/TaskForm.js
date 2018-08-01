import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Form, Field } from '@gigs/components/fields';

import { taskFormProps, requestStateProps } from '../shared/propTypes';
import { RequestStates } from '../../common/app/requestUiState';

import { formRules } from '../../model/field';

import styles from './TaskForm.module.styl';

export default class TaskForm extends Component {
  static propTypes = {
    form: PropTypes.shape(taskFormProps).isRequired,
    submitState: PropTypes.shape(requestStateProps).isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  handleSubmit = (values) => {
    const { form, onSubmit } = this.props;
    onSubmit(values, formRules(form.fields));
  }

  render() {
    const { submitState, form } = this.props;
    return (
      <Form
        form={form}
        className={styles.form}
        errors={submitState.error}
        isSubmitting={submitState.state === RequestStates.Fetching}
        onSubmit={this.handleSubmit}
      >
        {fieldProps => <Field {...fieldProps} />}
      </Form>
    );
  }
}
