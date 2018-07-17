import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import Panel from '../../shared/Panel';

import styles from './OnboardingFailed.module.styl';

export default class OnboardingFailed extends Component {
  render() {
    return (
      <Panel>
        <div className={styles.form}>
          <h1 className={styles.heading}>
            Failed
          </h1>
          <p className={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec maximus
            turpis. Nullam maximus eu nisl sed sollicitudin. Nulla sit amet cursus quam, in bibendum
            felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec maximus
            turpis. Nullam maximus eu nisl sed sollicitudin.
          </p>
          <div className={styles.actions}>
            <Link className={styles.back} to="/jobs">
              Browse available jobs
            </Link>
          </div>
        </div>
      </Panel>
    );
  }
}
