import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  Form,
  FormDataProvider,
  moduleControls,
  Module,
  ReportToggle,
} from '@expandorg/modules';

import { Panel, withServices } from '@expandorg/components';

import { RequestStates, requestStateProps } from '@expandorg/app-utils';

import GroupFaildDialog from './GroupFaildDialog';
import OnboardingReport from './OnboardingReport';

import { onboardingProps } from '../../shared/propTypes';

import {
  submitOnboarding,
  removeOnboardingMessage,
} from '../../../sagas/onboardingSagas';

import { submitOnboardingStateSelector } from '../../../selectors/uiStateSelectors';

import styles from './Onboarding.module.styl';

const mapStateToProps = state => ({
  submitState: submitOnboardingStateSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ submitOnboarding, removeOnboardingMessage }, dispatch);

class Onboarding extends Component {
  static propTypes = {
    jobId: PropTypes.number.isRequired,
    onboarding: onboardingProps.isRequired,
    submitState: requestStateProps.isRequired,
    services: PropTypes.object.isRequired, // eslint-disable-line

    submitOnboarding: PropTypes.func.isRequired,
    removeOnboardingMessage: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      reportMessage: null,
      original: props.onboarding,
      formData: {
        ...props.onboarding,
        fileUploadService: props.services.resolve('fileUpload'),
      },
    };
  }

  static getDerivedStateFromProps({ onboarding, services }, state) {
    if (onboarding !== state.original) {
      return {
        original: onboarding,
        formData: {
          ...onboarding,
          fileUploadService: services.resolve('fileUpload'),
        },
      };
    }
    return null;
  }

  handleSaveStep = values => {
    const { jobId } = this.props;
    this.props.submitOnboarding(jobId, values);
  };

  handleHideDialog = () => {
    const { jobId } = this.props;
    this.props.removeOnboardingMessage(jobId);
  };

  handleModuleError = reportMessage => {
    this.setState({ reportMessage });
  };

  render() {
    const { jobId, onboarding, submitState } = this.props;
    const { reportMessage, formData } = this.state;

    return (
      <div className={styles.container}>
        <Panel className={styles.panel}>
          <div className={styles.actions}>
            <ReportToggle form={onboarding.form} controls={moduleControls}>
              {({ onHide, reasons }) => (
                <OnboardingReport
                  jobId={jobId}
                  onHide={onHide}
                  reasons={reasons}
                  report={reportMessage}
                />
              )}
            </ReportToggle>
          </div>
          <div className={styles.form}>
            <FormDataProvider formData={formData}>
              <Form
                form={onboarding.form}
                errors={submitState.error}
                controls={moduleControls}
                isSubmitting={submitState.state === RequestStates.Fetching}
                onSubmit={this.handleSaveStep}
                onModuleError={this.handleModuleError}
              >
                {props => <Module {...props} />}
              </Form>
            </FormDataProvider>
          </div>
        </Panel>
        {onboarding.message && (
          <GroupFaildDialog
            onboarding={onboarding}
            onHide={this.handleHideDialog}
          />
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withServices(Onboarding));
