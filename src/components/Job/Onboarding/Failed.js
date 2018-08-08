import React, { Component } from 'react';
import cn from 'classnames';

import { Link } from 'react-router-dom';

import { Panel } from '@gigs/components';


import styles from './Failed.module.styl';

export default class OnboardingFailed extends Component {
  render() {
    return (
      <Panel>
        <div className={styles.form}>
          <h1 className={styles.heading}>
            Sorry you are out of tries
          </h1>
          <p className={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec maximus
            turpis. Nullam maximus eu nisl sed sollicitudin. Nulla sit amet cursus quam, in bibendum
            felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec maximus
            turpis. Nullam maximus eu nisl sed sollicitudin.
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
