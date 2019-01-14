import React, { Component } from 'react';

import { userProps } from '@expandorg/app-auth';

import Field from '../shared/Field';

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
