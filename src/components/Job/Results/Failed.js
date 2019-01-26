import React, { Component } from 'react';
import cn from 'classnames';

import { Link } from 'react-router-dom';

import { Panel } from '@expandorg/components';

import { jobProps } from '../../shared/propTypes';

import styles from './styles.module.styl';

export default class OnboardingFailed extends Component {
  static propTypes = {
    job: jobProps.isRequired,
  };

  render() {
    const { job } = this.props;

    return (
      <div className={styles.container}>
        <Panel className={styles.panel}>
          <h1 className={styles.heading}>Sorry you are out of tries!</h1>
          <div className={styles.title}>{job.onboarding.failureMessage}</div>
          <div className={styles.actions}>
            <Link
              className={cn('gem-button', 'gem-button-grey', styles.back)}
              to="/"
            >
              Ok
            </Link>
          </div>
        </Panel>
      </div>
    );
  }
}
