import React, { Component } from 'react';

import { userProps } from '@expandorg/app-auth';
import { Button } from '@expandorg/components';
import { userBalance } from '@expandorg/app-gemtokens';

import { Deposit, Withdraw } from '@expandorg/app-gemtokens/components';

import Hero from '../shared/Hero';

import styles from './XPN.module.styl';

export default class XPN extends Component {
  static propTypes = {
    user: userProps.isRequired,
  };

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  render() {
    const { user } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.stats}>
          <div className={styles.inner}>
            <Hero
              className={styles.hero}
              value={Math.round(userBalance.get(user) * 100) / 100}
              gems
              title="Balance"
            />
          </div>
          <div className={styles.inner}>
            <Hero
              className={styles.hero}
              value={Math.round(user.gems.reserved * 100) / 100}
              gems
              title="Reserved"
            />
          </div>
        </div>
        <div className={styles.actions}>
          <Deposit user={user}>
            {({ onToggleDepsoit }) => (
              <Button className={styles.deposit} onClick={onToggleDepsoit}>
                Deposit
              </Button>
            )}
          </Deposit>
          <Withdraw user={user}>
            {({ onToggleWithdraw }) => (
              <Button
                theme="secondary"
                className={styles.withdraw}
                onClick={onToggleWithdraw}
              >
                Withdraw
              </Button>
            )}
          </Withdraw>
        </div>
      </div>
    );
  }
}
