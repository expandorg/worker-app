import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Link } from 'react-router-dom';

import { Dialog, Button } from '@expandorg/components';
import { onboardingProps } from '../../shared/propTypes';

import styles from '../../shared/serviceForms.module.styl';

export default class GroupFaildDialog extends Component {
  static propTypes = {
    onboarding: onboardingProps.isRequired,
    onHide: PropTypes.func.isRequired,
  };

  render() {
    const { onboarding, onHide } = this.props;
    return (
      <Dialog
        onHide={onHide}
        visible
        hideButton
        contentLabel="onboarding group"
      >
        <div className={styles.container}>
          <div className={styles.inner}>
            <div className={styles.title}>Sorry, wrong answer!</div>
            <div className={styles.description}>{onboarding.message}</div>

            {onboarding.allowedRetries && (
              <div className={styles.descriptionBold}>
                <span className={styles.tries}>
                  {1 + onboarding.allowedRetries - +onboarding.currentTry}
                </span>
                tries left
              </div>
            )}
            <div className={styles.actions}>
              <Link
                className={cn('gem-button', 'gem-button-grey', styles.button)}
                to="/"
              >
                Give up
              </Link>
              <Button theme="pink" onClick={onHide} className={styles.button}>
                Try again
              </Button>
            </div>
          </div>
        </div>
      </Dialog>
    );
  }
}
