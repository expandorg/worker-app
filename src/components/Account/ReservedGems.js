import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Field from './Field';

import { userProps } from '../shared/propTypes';

import styles from './ReservedGems.module.styl';

import { getStakedGems } from '../../model/worker';

export default class ReservedGems extends Component {
  static propTypes = {
    user: PropTypes.shape(userProps).isRequired,
  }

  render() {
    return (
      <Field title="Reserved for Pending Tasks">
        <div className={styles.reserved}>
          {getStakedGems(this.props.user.stats.pending)} GEMS
        </div>
      </Field>
    );
  }
}
