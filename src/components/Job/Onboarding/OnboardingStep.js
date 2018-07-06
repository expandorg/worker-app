import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { RequestStates } from '../../../common/app/requestUiState';

import { onboardingStepProps, requestStateProps } from '../../shared/propTypes';

import ErrorMessage from '../../common/ErrorMessage';
import Field from '../../Task/form/Field';

import { FormBuilder } from '../../../model/tasks';

import styles from './OnboardingStep.module.styl';

export default class OnboardingStep extends Component {
  static propTypes = {
    step: PropTypes.shape(onboardingStepProps).isRequired,
    submitState: PropTypes.shape(requestStateProps).isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      values: FormBuilder.defaultValues(props.step.fields),
      errors: null,
    };
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
    const { step, onSubmit } = this.props;
    const { values } = this.state;

    onSubmit(step.id, values);
  }

  render() {
    const { submitState, step } = this.props;
    const { values, errors } = this.state;
    const isLoading = submitState.state === RequestStates.Fetching;
    return (
      <form className={styles.form} onSubmit={this.handleSubmit} >
        {step.fields.map(field => (
          <Field
            key={field.name}
            field={field}
            error={errors}
            value={values[field.name]}
            onChange={this.handleChange}
          />
        ))}
        <ErrorMessage error={errors} />
        <div className={styles.actions}>
          <button
            className={styles.submit}
            onClick={this.handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? 'Next...' : 'Next'}
          </button>
        </div>
      </form>
    );
  }
}
