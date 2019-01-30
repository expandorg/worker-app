import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as Warning } from '@expandorg/uikit/assets/warning.svg';

import { Dialog, Button } from '@expandorg/components';
import { userProps } from '@expandorg/app-auth';
import { Deposit } from '@expandorg/app-gemtokens/components';

import styles from '../../shared/serviceForms.module.styl';

export default class InsufficientFundsDialog extends Component {
  static propTypes = {
    user: userProps.isRequired,
    requires: PropTypes.number.isRequired,
    onHide: PropTypes.func.isRequired,
  };

  render() {
    const { onHide, requires, user } = this.props;

    return (
      <Dialog visible onHide={onHide} contentLabel="submit task">
        <div className={styles.container}>
          <div className={styles.inner}>
            <div className={styles.icon}>
              <Warning
                className={styles.warning}
                width={64}
                height={64}
                viewBox="0 0 42 42"
              />
            </div>
            <div className={styles.title}>
              You need {requires} XPN to qualify.
            </div>
            <div className={styles.description}>Would you like to top up? </div>
            <div className={styles.actions}>
              <Deposit user={user}>
                {({ onToggleDepsoit }) => (
                  <Button className={styles.button} onClick={onToggleDepsoit}>
                    deposit XPN
                  </Button>
                )}
              </Deposit>

              <Button className={styles.button} theme="grey" onClick={onHide}>
                no, go back
              </Button>
            </div>
          </div>
        </div>
      </Dialog>
    );
  }
}
