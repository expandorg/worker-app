import { useState, useCallback, useMemo } from 'react';

const filter = o => o;

const getSelectedValue = (values, options) => {
  if (!values.length) {
    return '';
  }
  const option = options.find(o => o.id === values[0]);
  return option ? option.value : '';
};

export function useStopPropagation() {
  return useCallback(e => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  }, []);
}

export function useDropdown(profile, options, onChange, property) {
  const val = getSelectedValue(profile[property], options);

  const autocomplete = useMemo(() => options.map(({ value }) => value), [
    options,
  ]);

  const select = useCallback(
    v => {
      const option = options.find(l => l.value === v);
      if (option) {
        onChange({ ...profile, [property]: [option.id] });
      }
    },
    [onChange, options, profile, property]
  );
  return [val, Function.prototype, select, autocomplete, filter];
}

export function useAutocomplete(profile, options, onChange, property) {
  const autocomplete = useMemo(() => options.map(({ value }) => value), [
    options,
  ]);

  const [suggest, setSuggest] = useState('');
  const change = useCallback(({ target }) => setSuggest(target.value), []);

  const select = useCallback(
    v => {
      setSuggest('');
      const option = options.find(l => l.value === v);
      if (option) {
        const edited = [...new Set(profile[property].concat(option.id))];
        onChange({ ...profile, [property]: edited });
      }
    },
    [onChange, options, profile, property]
  );

  const deselect = useCallback(
    id => {
      const edited = profile[property].filter(l => l !== id);
      onChange({ ...profile, [property]: edited });
    },
    [onChange, profile, property]
  );

  const selected = options.filter(l => profile[property].indexOf(l.id) !== -1);

  return [suggest, change, select, deselect, autocomplete, selected];
}
