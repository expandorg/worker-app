import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import withSubmitState from '../../hoc/withSubmitState';

import Panel from '../../shared/Panel';
import OnboardingStep from './OnboardingStep';

import { requestStateProps, jobProps, onboardingStatusProps } from '../../shared/propTypes';

import { submitOnboarding } from '../../../sagas/onboardingSagas';

import { submitOnboardingStateSelector } from '../../../selectors/uiStateSelectors';

const mapDispatchToProps = dispatch =>
  bindActionCreators({ submitOnboarding }, dispatch);

class Onboarding extends Component {
  static propTypes = {
    job: PropTypes.shape(jobProps).isRequired,
    onboardingStatus: PropTypes.shape(onboardingStatusProps).isRequired,
    submitState: PropTypes.shape(requestStateProps).isRequired,
    submitOnboarding: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,

    onAssign: PropTypes.func.isRequired,
  };

  getActiveStep(job, onboardingStatus) {
    return job.onboarding.steps.find(s => s.id === onboardingStatus.activeStep);
  }

  handleSaveStep = (stepId, form) => {
    const { onSubmit, job } = this.props;
    onSubmit(() => this.props.submitOnboarding(job.id, stepId, form));
  }

  handleAssign = () => {
    this.props.onAssign();
  }

  render() {
    const { job, onboardingStatus, submitState } = this.props;
    const step = this.getActiveStep(job, onboardingStatus);
    return (
      <Panel>
        <OnboardingStep
          step={step}
          submitState={submitState}
          onSubmit={this.handleSaveStep}
        />
      </Panel>
    );
  }
}

export default withSubmitState(submitOnboardingStateSelector)(
  connect(null, mapDispatchToProps)(Onboarding),
);
