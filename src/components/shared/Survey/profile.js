import { useState, useCallback, useMemo } from 'react';

export const showProfile = profile => {
  if (!profile) {
    return false;
  }
  return profile.state === 'not_filled';
};

export const getWizardForm = profile => {
  const {
    attributes: { Language, Education, Interest, Gender },
  } = profile;

  return {
    worker_id: profile.worker_id,
    state: profile.state,
    name: profile.name,
    birthdate: profile.birthdate,
    languages: Language ? Language.map(v => v.id) : [],
    gender: Gender ? Gender.map(v => v.id) : [],
    education: Education ? Education.map(v => v.id) : [],
    interests: Interest ? Interest.map(v => v.id) : [],
  };
};

const getProfileState = p => {
  return !!p.name &&
    !!p.birthdate &&
    !!p.languages.length &&
    !!p.gender.length &&
    !!p.education.length &&
    !!p.interests.length
    ? 'complete'
    : 'incomplete';
};

export const getRequestForm = (form, userId) => {
  const notFilled = form.state === 'not_filled';

  return {
    worker_id: notFilled ? userId : form.worker_id,
    name: form.name,
    birthdate: form.birthdate,
    state: getProfileState(form),
    attributes: [
      ...form.languages,
      ...form.gender,
      ...form.education,
      ...form.interests,
    ],
  };
};

const filter = o => o;

const getSelectedValue = (values, options) => {
  if (!values.length) {
    return '';
  }
  const option = options.find(o => o.id === values[0]);
  return option ? option.value : '';
};

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
