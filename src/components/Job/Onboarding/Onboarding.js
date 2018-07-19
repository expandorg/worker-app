import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import withSubmitState from '../../hoc/withSubmitState';

import Panel from '../../common/Panel';

import OnboardingForm from './OnboardingForm';

import { requestStateProps, onboardingProps } from '../../shared/propTypes';

import { submitOnboarding } from '../../../sagas/onboardingSagas';
import { submitOnboardingStateSelector } from '../../../selectors/uiStateSelectors';

import styles from './Onboarding.module.styl';

const mapDispatchToProps = dispatch =>
  bindActionCreators({ submitOnboarding }, dispatch);

class Onboarding extends Component {
  static propTypes = {
    jobId: PropTypes.number.isRequired,
    onboarding: PropTypes.shape(onboardingProps).isRequired,
    submitState: PropTypes.shape(requestStateProps).isRequired,

    submitOnboarding: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  handleSaveStep = (formValues, rules) => {
    const { onSubmit, onboarding, jobId } = this.props;
    onSubmit(() => this.props.submitOnboarding(jobId, onboarding.pageId, formValues, rules));
  }


  render() {
    const { onboarding, submitState } = this.props;
    return (
      <Panel className={styles.container}>
        <OnboardingForm
          form={onboarding.form}
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
