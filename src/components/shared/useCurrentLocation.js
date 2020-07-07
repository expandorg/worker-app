import { useEffect, useState } from 'react';

import { useService } from '@expandorg/components';

export default function useCurrentLocation() {
  const services = useService();
  const locationService = services.resolve('location');
  const [latLng, setlatLng] = useState(locationService.latLng);

  useEffect(() => locationService.findCurrent((ll) => setlatLng(ll)), [
    locationService,
  ]);

  return latLng;
}
