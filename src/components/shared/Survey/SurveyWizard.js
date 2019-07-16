import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { requestStateProps, RequestStates } from '@expandorg/app-utils';

import Form from './Form/Form';

import Name from './Form/Name';
import Languages from './Form/Languages';
import Location from './Form/Location';
import Gender from './Form/Gender';
import BirthDate from './Form/BirthDate';
import Education from './Form/Education';
import Interests from './Form/Interests';

const titles = [
  'Let’s get you all set up with just a few questions starting off with your name.',
  'What languages do you know?',
  'Where are you living?',
  'What is your birth date?',
  'What is your gender?',
  'What is your education?',
  'What is your interests?',
];

const last = titles.length - 1;

export default function SurveyWizard({ onSubmit, submitState }) {
  const [profile, setProfile] = useState({
    name: '',
    languages: [],
    location: '',
    birthdate: undefined,
    gender: '',
    edication: '',
    interests: [],
  });

  const [page, setPage] = useState(0);

  const save = useCallback(() => {
    onSubmit(profile);
  }, [onSubmit, profile]);

  return (
    <Form
      title={titles[page]}
      isFetching={submitState.state === RequestStates.Fetching}
      nextTitle={page === last ? 'Save' : undefined}
      onNext={page === last ? save : () => setPage(p => p + 1)}
      onBack={page === 0 ? null : () => setPage(p => p - 1)}
    >
      {page === 0 && <Name onChange={setProfile} profile={profile} />}
      {page === 1 && <Languages onChange={setProfile} profile={profile} />}
      {page === 2 && <Location onChange={setProfile} profile={profile} />}
      {page === 3 && <BirthDate onChange={setProfile} profile={profile} />}
      {page === 4 && <Gender onChange={setProfile} profile={profile} />}
      {page === 5 && <Education onChange={setProfile} profile={profile} />}
      {page === 6 && <Interests onChange={setProfile} profile={profile} />}
    </Form>
  );
}

SurveyWizard.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitState: requestStateProps.isRequired,
};
