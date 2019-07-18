import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import {
  RequestStates,
  requestStateProps,
  useSubmitEffect,
} from '@expandorg/app-utils';
import { useSyncedState } from '@expandorg/components';

import Navbar from '../Navbar';
import Form from './Form/Form';

import Name from './Form/Name';
import Languages from './Form/Languages';
import Location from './Form/Location';
import Gender from './Form/Gender';
import BirthDate from './Form/BirthDate';
import Education from './Form/Education';
import Interests from './Form/Interests';

import { titles, last, getRequestForm, getWizardForm } from './profile';

import styles from './SurveyWizard.module.styl';

export default function SurveyWizard({
  profile: o,
  filters,
  userId,
  saveState,
  onSave,
  onHide,
}) {
  const [profile, setProfile] = useSyncedState(o, getWizardForm);

  const [page, setPage] = useState(0);

  const skip = useCallback(() => {
    onSave(getRequestForm(o, userId));
    onHide();
  }, [o, onHide, onSave, userId]);

  const back = useCallback(() => setPage(p => p - 1), []);

  const next = useCallback(() => {
    onSave(getRequestForm(profile, userId));
  }, [onSave, profile, userId]);

  const isLast = page === last;
  const saved = useCallback(() => {
    if (!isLast) {
      setPage(p => p + 1);
    } else {
      onHide();
    }
  }, [isLast, onHide]);

  useSubmitEffect(saveState, saved);

  return (
    <div className={styles.container}>
      <Navbar title="Getting Started" theme="dark" top={false}>
        <div className={styles.header}>
          <button onClick={skip} className={styles.skip}>
            skip
          </button>
        </div>
      </Navbar>
      <div className={styles.content}>
        <Form
          title={titles[page]}
          isFetching={saveState.state === RequestStates.Fetching}
          nextTitle={isLast ? 'Done' : 'Next'}
          onNext={next}
          onBack={page !== 0 ? back : null}
        >
          {page === 0 && <Name onChange={setProfile} profile={profile} />}
          {page === 1 && (
            <Languages
              onChange={setProfile}
              profile={profile}
              languages={filters.Language}
            />
          )}
          {page === 2 && (
            <Location
              onChange={setProfile}
              profile={profile}
              filters={filters}
            />
          )}
          {page === 3 && <BirthDate onChange={setProfile} profile={profile} />}
          {page === 4 && (
            <Gender
              onChange={setProfile}
              profile={profile}
              genders={filters.Gender}
            />
          )}
          {page === 5 && (
            <Education
              onChange={setProfile}
              profile={profile}
              filters={filters}
            />
          )}
          {page === 6 && (
            <Interests
              onChange={setProfile}
              profile={profile}
              interests={filters.Interest}
            />
          )}
        </Form>
      </div>
    </div>
  );
}

SurveyWizard.propTypes = {
  profile: PropTypes.shape({}).isRequired,
  filters: PropTypes.shape({}).isRequired,
  userId: PropTypes.number.isRequired,
  saveState: requestStateProps.isRequired,
  onSave: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
};
