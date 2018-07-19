import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import Panel from '../../common/Panel';
import Button from '../../common/Button';

import { RequestStates } from '../../../common/app/requestUiState';

import { requestStateProps } from '../../shared/propTypes';

import styles from './OnboardingComplete.module.styl';

export default class OnboardingComplete extends Component {
  static propTypes = {
    // onboarding: PropTypes.shape(onboardingProps).isRequired,
    submitState: PropTypes.shape(requestStateProps).isRequired,
    onAssign: PropTypes.func.isRequired,
  };

  render() {
    const { submitState, onAssign } = this.props;
    const isSubmitting = submitState.state === RequestStates.Fetching;
    return (
      <Panel>
        <div className={styles.form}>
          <h1 className={styles.heading}>
            Great job!
          </h1>
          <p className={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec maximus
            turpis. Nullam maximus eu nisl sed sollicitudin. Nulla sit amet cursus quam, in bibendum
            felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec maximus
            turpis. Nullam maximus eu nisl sed sollicitudin.
          </p>
          <p className={styles.description}>
            Continue with the real task and earn some gems!
          </p>
          <div className={styles.actions}>
            <Link className={styles.back} to="/jobs">
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
