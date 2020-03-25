import { useState, useEffect, useCallback } from 'react';
import debounce from 'debounce';
import { lsRead, lsWrite, lsRemove } from '@expandorg/components';

const DELAY = 100;

const debouncedWrite = debounce(lsWrite, DELAY);

export default function useFormPersist(id) {
  const key = `form-${id}`;
  const [initial, setInitial] = useState(lsRead(key));

  useEffect(() => {
    setInitial(lsRead(key));
    return () => {
      lsRemove(key);
    };
  }, [key]);

  const persist = useCallback((value) => debouncedWrite(key, value), [key]);
  const clear = useCallback(() => lsRemove(key), [key]);

  return [initial, persist, clear];
}
