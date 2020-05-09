import React, { useEffect } from 'react';

import { ServiceProvider } from '@expandorg/components';
import { useHistory } from 'react-router';
import services from '../../services';

export default function ServiceProviderExtended({ children }) {
  const history = useHistory();

  useEffect(() => {
    services.register('history', history);
  }, [history]);

  return <ServiceProvider services={services}>{children}</ServiceProvider>;
}
