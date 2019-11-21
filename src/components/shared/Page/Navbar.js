import React from 'react';

import { Navbar as UINavbar } from '@expandorg/components/app';

export default function Navbar({ children, ...rest }) {
  return <UINavbar {...rest}>{children}</UINavbar>;
}
