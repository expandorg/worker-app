import React, { Component } from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';

import { Link } from 'react-router-dom';

import { Panel, Button } from '@gemsorg/components';

import { RequestStates, requestStateProps } from '@gemsorg/app-utils';

import { jobProps } from '../../shared/propTypes';

import styles from './Complete.module.styl';

export default class OnboardingComplete extends Component {
  static propTypes = {
    job: jobProps.isRequired,
    submitState: requestStateProps.isRequired,
    onAssign: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { submitState, job, onAssign } = this.props;
    const isSubmitting = submitState.state === RequestStates.Fetching;
    if (!job.onboarding.successMessage && !isSubmitting) {
      onAssign();
    }
  }

  render() {
    const { submitState, job, onAssign } = this.props;
    if (!job.onboarding.successMessage) {
      return null;
    }

    const isSubmitting = submitState.state === RequestStates.Fetching;

    return (
      <Panel>
        <div className={styles.form}>
          <h1 className={styles.heading}>Great job!</h1>
          <p className={styles.description}>{job.onboarding.successMessage}</p>
          <p className={styles.description}>
            Continue with the real task and earn some XPN!
          </p>
          <div className={styles.actions}>
            <Link
              className={cn(
                'gem-button',
                'gem-button-large',
                'gem-button-white',
                styles.back
              )}
              to="/jobs"
            >
              Not interesting
            </Link>
            <Button
              theme="pink"
              size="large"
              className={styles.start}
              onClick={onAssign}
              disabled={isSubmitting}
            >
              Start
            </Button>
          </div>
        </div>
      </Panel>
    );
  }
}
