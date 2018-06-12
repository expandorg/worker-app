import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { RequestStates } from '../../../common/app/requestUiState';

import { taskProps, requestStateProps } from '../../shared/propTypes';

import Panel from '../../shared/Panel';
import ErrorMessage from '../../common/ErrorMessage';

import Field from './Field';

import { triviaForm, FormBuilder } from '../../../model/tasks';

import styles from './Form.module.styl';

export default class Form extends Component {
  static propTypes = {
    submitState: PropTypes.shape(requestStateProps).isRequired,
    task: PropTypes.shape(taskProps).isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    const form = props.task.form || triviaForm;

    this.state = {
      values: FormBuilder.defaultValues(form.fields),
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
    const { task, onSubmit } = this.props;
    const { values } = this.state;

    evt.preventDefault();
    const form = task.form || triviaForm;

    onSubmit(values, FormBuilder.validation(form.fields));
  }

  render() {
    const { submitState, task } = this.props;
    const { values, errors } = this.state;

    const isLoading = submitState.state === RequestStates.Fetching;
    const form = task.form || triviaForm;
    return (
      <Panel className={styles.container}>
        <form className={styles.form} onSubmit={this.handleSubmit} >
          <div className={styles.description}>
            {form.description}
          </div>
          <ErrorMessage error={errors} />
          {form.fields.map(field => (
            <Field
              key={field.name}
              field={field}
              error={errors}
              value={values[field.name]}
              onChange={this.handleChange}
            />
          ))}
          <div className={styles.actions}>
            <button
              className={styles.submit}
              onClick={this.handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </Panel>
    );
  }
}
