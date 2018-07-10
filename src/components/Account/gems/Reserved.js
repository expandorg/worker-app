import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Field from '../shared/Field';

import { userProps } from '../../shared/propTypes';
import { userBalance } from '../../../model/balance';


export default class Reserved extends Component {
  static propTypes = {
    user: PropTypes.shape(userProps).isRequired,
  }

  render() {
    const { user } = this.props;
    return (
      <Field
        title={`${userBalance.stakedGems(user.stats.pending)} GEMS Reserverd for tasks`}
      />
    );
  }
}
