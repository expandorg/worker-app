import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Panel } from '@gemsorg/components';

import {
  Form,
  FormDataProvider,
  moduleControls,
  Module,
  ReportToggle,
} from '@gemsorg/components/modules';

import OnboardingModuleTypes from './modules/OnboardingModuleTypes';
import Rules from './modules/Rules';
import QA from './modules/QA/QA';

import { RequestStates } from '../../../common/app/requestUiState';

import withSubmitState from '../../hoc/withSubmitState';

import GroupFaildDialog from './GroupFaildDialog';
import Report from '../../shared/Report';

import { requestStateProps, onboardingProps } from '../../shared/propTypes';

import {
  submitOnboarding,
  reportOnboarding,
  removeOnboardingMessage,
} from '../../../sagas/onboardingSagas';
import {
  submitOnboardingStateSelector,
  reportOnboardingStateSelector,
} from '../../../selectors/uiStateSelectors';

import styles from './Onboarding.module.styl';

const controls = {
  ...moduleControls,
  [OnboardingModuleTypes.qa]: QA,
  [OnboardingModuleTypes.rules]: Rules,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      submitOnboarding,
      removeOnboardingMessage,
      reportOnboarding,
    },
    dispatch
  );

const OnboardingReport = withSubmitState(reportOnboardingStateSelector)(Report);

class Onboarding extends Component {
  static propTypes = {
    jobId: PropTypes.number.isRequired,
    onboarding: PropTypes.shape(onboardingProps).isRequired,
    submitState: PropTypes.shape(requestStateProps).isRequired,

    submitOnboarding: PropTypes.func.isRequired,
    reportOnboarding: PropTypes.func.isRequired,
    removeOnboardingMessage: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    reportMessage: null,
  };

  handleSaveStep = values => {
    const { onSubmit, jobId } = this.props;
    onSubmit(() => this.props.submitOnboarding(jobId, values));
  };

  handleHideDialog = () => {
    const { jobId } = this.props;
    this.props.removeOnboardingMessage(jobId);
  };

  handleModuleError = reportMessage => {
    this.setState({ reportMessage });
  };

  handleReport = (reason, message) => {
    const { jobId } = this.props;
    this.props.reportOnboarding(jobId, reason, message);
  };

  render() {
    const { onboarding, submitState } = this.props;
    const { reportMessage } = this.state;

    return (
      <Panel className={styles.container}>
        <div className={styles.actions}>
          <ReportToggle form={onboarding.form}>
            {({ onHide, reasons }) => (
              <OnboardingReport
                onHide={onHide}
                reasons={reasons}
                report={reportMessage}
                onReport={this.handleReport}
              />
            )}
          </ReportToggle>
        </div>
        <div className={styles.form}>
          <FormDataProvider formData={onboarding}>
            <Form
              form={onboarding.form}
              errors={submitState.error}
              isSubmitting={submitState.state === RequestStates.Fetching}
              onSubmit={this.handleSaveStep}
              onModuleError={this.handleModuleError}
            >
              {props => <Module {...props} controls={controls} />}
            </Form>
          </FormDataProvider>
        </div>
        {onboarding.message && (
          <GroupFaildDialog
            onboarding={onboarding}
            onHide={this.handleHideDialog}
          />
        )}
      </Panel>
    );
  }
}

export default withSubmitState(submitOnboardingStateSelector)(
  connect(
    null,
    mapDispatchToProps
  )(Onboarding)
);
