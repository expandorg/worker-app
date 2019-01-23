import React from 'react';

import { Page as UIPage } from '@expandorg/components/app';
import Notifications from './Notifications';

export default function Page({ children, ...rest }) {
  return (
    <UIPage {...rest}>
      {children}
      <Notifications />
    </UIPage>
  );
}
