import React, { Component } from 'react';

import { Navbar as UINavbar } from '@expandorg/components/app';

export default class Navbar extends Component {
  render() {
    const { children, ...rest } = this.props;

    return <UINavbar {...rest}>{children}</UINavbar>;
  }
}
