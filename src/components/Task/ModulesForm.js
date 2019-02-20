import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withServices, Panel } from '@expandorg/components';
import { Form, Module, formProps, FormDataProvider } from '@expandorg/modules';
import { moduleControls } from '@expandorg/modules/app';
import {
  RequestStates,
  requestStateProps,
  SubmitStateEffect,
} from '@expandorg/app-utils';

import TaskActions from './Actions/Actions';
import SubmissionResultDialog from './Results/SubmissionResultDialog';

import { assignmentProps } from '../shared/propTypes';

import styles from './styles.module.styl';

class ModulesForm extends Component {
  static propTypes = {
    assignment: assignmentProps.isRequired,
    form: formProps,
    visible: PropTypes.bool.isRequired,
    variables: PropTypes.shape({}),
    services: PropTypes.object.isRequired,  //eslint-disable-line

    submitState: requestStateProps.isRequired,

    onSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    form: null,
    variables: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      isSubmitted: false,
      reportMessage: null,

      formData: {
        fileUploadService: props.services.resolve('fileUpload'),
      },
    };
  }

  handleAssigned = () => {
    this.setState({ reportMessage: null, isSubmitted: false });
  };

  handleSubmitted = () => {
    this.setState({ isSubmitted: true });
  };

  handleModuleError = reportMessage => {
    this.setState({ reportMessage });
  };

  render() {
    const {
      submitState,
      visible,
      form,
      assignment,
      variables,
      onSubmit,
    } = this.props;

    const { reportMessage, isSubmitted, formData } = this.state;
    const isFetching = submitState.state === RequestStates.Fetching;

    return (
      <>
        {visible && (
          <Panel className={styles.panel}>
            <TaskActions
              assignmentId={assignment.id}
              form={form}
              reportMessage={reportMessage}
            />
            <FormDataProvider formData={formData}>
              <Form
                controls={moduleControls}
                className={styles.form}
                form={form}
                variables={variables}
                errors={submitState.error}
                isSubmitting={isFetching}
                onSubmit={onSubmit}
                onModuleError={this.handleModuleError}
              >
                {props => <Module {...props} />}
              </Form>
            </FormDataProvider>
          </Panel>
        )}
        <SubmitStateEffect
          submitState={submitState}
          onComplete={this.handleSubmitted}
        />
        {isSubmitted && (
          <SubmissionResultDialog
            jobId={assignment.jobId}
            onAssignComplete={this.handleAssigned}
          />
        )}
      </>
    );
  }
}

export default withServices(ModulesForm);
