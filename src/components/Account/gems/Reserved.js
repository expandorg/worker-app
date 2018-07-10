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
    const value = userBalance.stakedGems(user.stats.pending);
    return (
      <Field
        title={(
          <span>
            {value} tokens reserverd for tasks
          </span>
        )}
      />
    );
  }
}
