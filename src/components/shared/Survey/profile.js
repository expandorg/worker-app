import { useState, useCallback, useMemo } from 'react';

export const getWizardForm = profile => {
  const { attributes } = profile;

  const languages = attributes.Language
    ? attributes.Language.map(v => v.id)
    : [];

  const interests = attributes.Interest
    ? attributes.Interest.map(v => v.id)
    : [];

  const gender = attributes.Gender ? attributes.Gender.map(v => v.id) : [];

  return {
    worker_id: profile.worker_id,
    state: profile.state,
    name: profile.name,
    birthdate: profile.birthdate,
    languages,
    interests,
    gender,
  };
};

export const getRequestForm = (form, userId) => {
  const notFilled = form.state === 'not_filled';
  const attributes = [...form.languages, ...form.gender, ...form.interests];

  return {
    worker_id: notFilled ? userId : form.worker_id,
    name: form.name,
    birthdate: form.birthdate,
    state: 'incomplete',
    attributes,
  };
};

export const titles = [
  'Let’s get you all set up with just a few questions starting off with your name.',
  'What languages do you know?',
  'Where are you living?',
  'What is your birth date?',
  'What is your gender?',
  'What is your education?',
  'What is your interests?',
];

export const last = titles.length - 1;

export function useAutocomplete(profile, options, onChange, property) {
  const [suggest, setSuggest] = useState('');

  const change = useCallback(({ target }) => setSuggest(target.value), []);
  const select = useCallback(
    lang => {
      setSuggest('');
      const option = options.find(l => l.value === lang);
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

  const autocomplete = useMemo(() => options.map(({ value }) => value), [
    options,
  ]);

  const selected = options.filter(l => profile[property].indexOf(l.id) !== -1);

  return [suggest, change, select, deselect, autocomplete, selected];
}
