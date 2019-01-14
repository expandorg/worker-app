import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Link } from 'react-router-dom';

import { Dialog, DialogHeadline, Button } from '@expandorg/components';

import { onboardingProps } from '../../shared/propTypes';

import styles from './GroupFaildDialog.module.styl';

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
        <DialogHeadline>Answer</DialogHeadline>
        <div className={styles.container}>
          <div className={styles.inner}>
            <div className={styles.title}>Sorry, wrong answer!</div>
            <div className={styles.message}>{onboarding.message}</div>
            {onboarding.allowedRetries && (
              <div className={styles.message}>
                <span className={styles.tries}>
                  {1 + onboarding.allowedRetries - +onboarding.currentTry}
                </span>
                tries left
              </div>
            )}
            <div className={styles.actions}>
              <Link
                className={cn(
                  'gem-button',
                  'gem-button-large',
                  'gem-button-white',
                  styles.link
                )}
                to="/jobs"
              >
                Give up
              </Link>
              <Button
                theme="pink"
                size="large"
                className={styles.ok}
                onClick={onHide}
              >
                Try again
              </Button>
            </div>
          </div>
        </div>
      </Dialog>
    );
  }
}
