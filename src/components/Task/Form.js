import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button, ErrorMessage } from '@gigs/components';
import { Field, Validation } from '@gigs/components/fields';

import { RequestStates } from '../../common/app/requestUiState';

import { taskFormProps, requestStateProps } from '../shared/propTypes';

import { formRules } from '../../model/field';

import styles from './Form.module.styl';

export default class Form extends Component {
  static propTypes = {
    form: PropTypes.shape(taskFormProps).isRequired,
    submitState: PropTypes.shape(requestStateProps).isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    values: {},
    errors: null,
  }

  componentWillReceiveProps({ submitState: nextState }) {
    const { submitState } = this.props;
    if (nextState.error && nextState.error !== submitState.error) {
      this.setState({ errors: nextState.error });
    }
  }

  handleChange = (field, value) => {
    this.setState(({ values, errors }) => ({
      values: {
        ...values,
        [field]: value,
      },
      errors: (!errors || !errors[field]) ? errors : {
        ...errors,
        [field]: undefined,
      },
    }));
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    const { form, onSubmit } = this.props;
    const { values } = this.state;

    onSubmit(values, formRules(form.fields));
  }

  render() {
    const { submitState, form } = this.props;
    const { values, errors } = this.state;
    const isSubmitting = submitState.state === RequestStates.Fetching;
    return (
      <form className={styles.form} onSubmit={this.handleSubmit} >
        <div className={styles.description}>
          {form.description}
        </div>
        <ErrorMessage error={errors} />
        {form.fields.map(field => (
          <Validation key={field.name} name={field.name} error={errors} >
            <Field
              field={field}
              value={values[field.name]}
              isSubmitting={isSubmitting}
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
            />
          </Validation>
        ))}
        <div className={styles.actions}>
          <Button
            theme="pink"
            size="large"
            className={styles.submit}
            onClick={this.handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      </form>
    );
  }
}
