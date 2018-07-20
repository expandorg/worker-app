import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ErrorMessage } from '@gigs/components';
import { Submit, Validation } from '@gigs/components/fields';

import { RequestStates } from '../../../common/app/requestUiState';

import { onboardingFormProps, requestStateProps } from '../../shared/propTypes';

import OnboardingField from './fields/OnboardingField';

import { formRules } from '../../../model/field';

import styles from './Form.module.styl';

export default class OnboardingForm extends Component {
  static propTypes = {
    form: PropTypes.shape(onboardingFormProps).isRequired,
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
      <div className={styles.container}>
        <form className={styles.form} onSubmit={this.handleSubmit} >
          {form.fields.map(field => (
            <Validation key={field.name} name={field.name} error={errors} >
              <OnboardingField
                field={field}
                value={values[field.name]}
                isSubmitting={isSubmitting}
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
              />
            </Validation>
          ))}
          <ErrorMessage error={errors} />
          {form.submit &&
            <Submit
              {...form.submit}
              isSubmitting={isSubmitting}
              onSubmit={this.handleSubmit}
            />
          }
        </form>
      </div>
    );
  }
}
