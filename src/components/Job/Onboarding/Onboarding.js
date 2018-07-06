import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import withSubmitState from '../../hoc/withSubmitState';

import Panel from '../../shared/Panel';

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

  handleSaveStep = (step, form) => {
    const { onSubmit, job } = this.props;
    onSubmit(() => this.props.submitOnboarding(job.id, step, form));
  }

  render() {
    const { onboardingStatus } = this.props;
    return (
      <Panel>
        {/* <Description job={job} next={this.nextStep} />
          <Rules next={this.nextStep} />
          <Eligibility next={this.startTesting} />
          <Questions
            job={job}
            next={this.nextStep}
            question={this.state.question}
            answer={this.state.answer}
            postAnswer={this.postAnswer}
            cancelTest={this.cancelTest}
            finishedTest={this.finishedTest}
            abandon={this.abandon}
          /> */}
      </Panel>
    );
  }
}

export default withSubmitState(submitOnboardingStateSelector)(
  connect(undefined, mapDispatchToProps)(Onboarding),
);
