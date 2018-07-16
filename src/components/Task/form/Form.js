import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { RequestStates } from '../../../common/app/requestUiState';

import { taskFormProps, requestStateProps } from '../../shared/propTypes';

import Panel from '../../shared/Panel';
import Field from '../../shared/form/Field';
import FieldContainer from '../../shared/form/FieldContainer';

import ErrorMessage from '../../common/ErrorMessage';

import { FormBuilder } from '../../../model/tasks';

import styles from './Form.module.styl';

export default class Form extends Component {
  static propTypes = {
    submitState: PropTypes.shape(requestStateProps).isRequired,
    taskForm: PropTypes.shape(taskFormProps).isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      values: FormBuilder.defaultValues(props.taskForm.fields),
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
    const { taskForm, onSubmit } = this.props;
    const { values } = this.state;

    evt.preventDefault();

    onSubmit(values, FormBuilder.validation(taskForm.fields));
  }

  render() {
    const { submitState, taskForm } = this.props;
    const { values, errors } = this.state;
    const isSubmitting = submitState.state === RequestStates.Fetching;
    return (
      <Panel className={styles.container}>
        <form className={styles.form} onSubmit={this.handleSubmit} >
          <div className={styles.description}>
            {taskForm.description}
          </div>
          <ErrorMessage error={errors} />
          {taskForm.fields.map(field => (
            <FieldContainer key={field.name} name={field.name} error={errors} >
              <Field
                field={field}
                value={values[field.name]}
                isSubmitting={isSubmitting}
                onChange={this.handleChange}
                onClick={this.handleSubmit}
              />
            </FieldContainer>
          ))}
          <div className={styles.actions}>
            <button
              className={styles.submit}
              onClick={this.handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </Panel>
    );
  }
}
