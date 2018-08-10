import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Link } from 'react-router-dom';

import { Panel } from '@gigs/components';

import { jobProps } from '../../shared/propTypes';

import styles from './Failed.module.styl';

export default class OnboardingFailed extends Component {
  static propTypes = {
    job: PropTypes.shape(jobProps).isRequired,
  };

  render() {
    const { job } = this.props;
    return (
      <Panel>
        <div className={styles.form}>
          <h1 className={styles.heading}>
            Sorry you are out of tries
          </h1>
          <p className={styles.description}>
            {job.onboarding.failureMessage}
          </p>
          <div className={styles.actions}>
            <Link
              className={cn('gem-button', 'gem-button-large', 'gem-button-pink', styles.back)}
              to="/jobs"
            >
              Ok
            </Link>
          </div>
        </div>
      </Panel>
    );
  }
}
