// eslint-disable-next-line no-unused-vars
export const showProfile = (profile) => {
  if (!profile) {
    return false;
  }
  return profile.state === 'not_filled';
};

export const getWizardForm = (profile) => {
  const {
    attributes: { Language, Education, Interest, Availability },
  } = profile;

  return {
    worker_id: profile.worker_id,
    state: profile.state,
    name: profile.name,
    birthdate: profile.birthdate,
    country: profile.country,
    locality: profile.locality,
    city: profile.city,
    languages: Language ? Language.map((v) => v.id) : [],
    education: Education ? Education.map((v) => v.id) : [],
    interests: Interest ? Interest.map((v) => v.id) : [],
    availability: Availability ? Availability.map((v) => v.id) : [],
  };
};

const getProfileState = (p) => {
  return !!p.name &&
    !!p.birthdate &&
    !!p.country &&
    !!p.locality &&
    !!p.city &&
    !!p.languages.length &&
    !!p.education.length &&
    !!p.interests.length // &&
    ? // !!p.availability.length
      'complete'
    : 'incomplete';
};

export const getRequestForm = (form, userId) => {
  const notFilled = form.state === 'not_filled';

  return {
    worker_id: notFilled ? userId : form.worker_id,
    name: form.name,
    birthdate: form.birthdate,
    country: form.country,
    locality: form.locality,
    city: form.city,
    state: getProfileState(form),
    attributes: [
      ...form.languages,
      ...form.education,
      ...form.interests,
      ...form.availability,
    ],
  };
};
