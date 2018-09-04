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
} from '@gemsorg/components/modules';

import OnboardingModuleTypes from './modules/OnboardingModuleTypes';
import Rules from './modules/Rules';
import QA from './modules/QA/QA';

import { RequestStates } from '../../../common/app/requestUiState';

import withSubmitState from '../../hoc/withSubmitState';

import GroupFaildDialog from './GroupFaildDialog';

import { requestStateProps, onboardingProps } from '../../shared/propTypes';

import {
  submitOnboarding,
  removeOnboardingMessage,
} from '../../../sagas/onboardingSagas';
import { submitOnboardingStateSelector } from '../../../selectors/uiStateSelectors';

import styles from './Onboarding.module.styl';

const controls = {
  ...moduleControls,
  [OnboardingModuleTypes.qa]: QA,
  [OnboardingModuleTypes.rules]: Rules,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ submitOnboarding, removeOnboardingMessage }, dispatch);

class Onboarding extends Component {
  static propTypes = {
    jobId: PropTypes.number.isRequired,
    onboarding: PropTypes.shape(onboardingProps).isRequired,
    submitState: PropTypes.shape(requestStateProps).isRequired,

    submitOnboarding: PropTypes.func.isRequired,
    removeOnboardingMessage: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  handleSaveStep = values => {
    const { onSubmit, jobId } = this.props;
    onSubmit(() => this.props.submitOnboarding(jobId, values));
  };

  handleHideDialog = () => {
    const { jobId } = this.props;
    this.props.removeOnboardingMessage(jobId);
  };

  render() {
    const { onboarding, submitState } = this.props;
    return (
      <Panel className={styles.container}>
        <div className={styles.form}>
          <FormDataProvider formData={onboarding}>
            <Form
              form={onboarding.form}
              errors={submitState.error}
              isSubmitting={submitState.state === RequestStates.Fetching}
              onSubmit={this.handleSaveStep}
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
