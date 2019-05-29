import { useContext, useEffect, useState } from 'react';

import { ServicesContext } from '@expandorg/components';

export default function useCurrentLocation() {
  const services = useContext(ServicesContext);
  const locationService = services.resolve('location');
  const [latLng, setlatLng] = useState(locationService.latLng);

  useEffect(() => locationService.findCurrent(ll => setlatLng(ll)), []);

  return latLng;
}
