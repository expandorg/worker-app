import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Panel } from '@gigs/components';
import { Form } from '@gigs/components/fields';

import withSubmitState from '../../hoc/withSubmitState';

import OnboardingField from './fields/OnboardingField';

import { requestStateProps, onboardingProps } from '../../shared/propTypes';
import { formRules } from '../../../model/field';
import { RequestStates } from '../../../common/app/requestUiState';

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

  handleSaveStep = (values) => {
    const { onSubmit, onboarding: { form, pageId }, jobId } = this.props;
    const rules = formRules(form.fields);
    onSubmit(() => this.props.submitOnboarding(jobId, pageId, values, rules));
  }

  render() {
    const { onboarding, submitState } = this.props;
    return (
      <Panel className={styles.container}>
        <div className={styles.form}>
          <Form
            form={onboarding.form}
            errors={submitState.error}
            isSubmitting={submitState.state === RequestStates.Fetching}
            onSubmit={this.handleSaveStep}
          >
            {fieldProps => <OnboardingField {...fieldProps} />}
          </Form>
        </div>
      </Panel>
    );
  }
}

export default withSubmitState(submitOnboardingStateSelector)(
  connect(null, mapDispatchToProps)(Onboarding),
);
