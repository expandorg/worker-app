import React, { Component } from 'react';

import Field from '../shared/Field';

import { userProps } from '../../shared/propTypes';

export default class Reserved extends Component {
  static propTypes = {
    user: userProps.isRequired,
  };

  render() {
    const { user } = this.props;
    return (
      <Field
        title={<span>{user.gems.reserved} tokens reserverd for tasks</span>}
      />
    );
  }
}
