import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Field from './Field';

import { userProps } from '../shared/propTypes';

import styles from './ReservedGems.module.styl';

import { userBalance } from '../../model/balance';

export default class ReservedGems extends Component {
  static propTypes = {
    user: PropTypes.shape(userProps).isRequired,
  }

  render() {
    const { user } = this.props;
    return (
      <Field title="Reserved for Pending Tasks">
        <div className={styles.reserved}>
          {userBalance.stakedGems(user.stats.pending)} GEMS
        </div>
      </Field>
    );
  }
}
