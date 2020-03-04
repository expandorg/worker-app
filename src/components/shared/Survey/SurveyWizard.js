import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import {
  RequestStates,
  requestStateProps,
  useSubmitEffect,
} from '@expandorg/app-utils';
import { useSyncedState } from '@expandorg/components';
import { Navbar } from '@expandorg/components/app';

import { Form } from './Form/Form';

import Name from './Form/Name';
import Languages from './Form/Languages';
import Location from './Form/Location';
import BirthDate from './Form/BirthDate';
import Education from './Form/Education';
import Interests from './Form/Interests';
import Availability from './Form/Availability';

import { getRequestForm, getWizardForm } from './profile';

import useCurrentLocation from '../useCurrentLocation';

import styles from './SurveyWizard.module.styl';

const pages = {
  Name: 0,
  Languages: 1,
  Location: 2,
  BirthDate: 3,
  Education: 4,
  Intersts: 5,
  Availability: 6,
};

export default function SurveyWizard({
  profile: o,
  filters,
  userId,
  title,
  saveState,
  onSave,
  onHide,
}) {
  const [profile, set] = useSyncedState(o, getWizardForm);

  const [page, setPage] = useState(0);

  const skip = useCallback(() => {
    onSave(getRequestForm(getWizardForm(o), userId));
    onHide();
  }, [o, onHide, onSave, userId]);

  const back = useCallback(() => setPage(p => p - 1), []);

  const next = useCallback(() => {
    onSave(getRequestForm(profile, userId));
  }, [onSave, profile, userId]);

  const isLast = page === Reflect.ownKeys(pages).length - 1;

  const saved = useCallback(() => {
    if (!isLast) {
      setPage(p => p + 1);
    } else {
      onHide();
    }
  }, [isLast, onHide]);

  useSubmitEffect(saveState, saved);
  useCurrentLocation();

  return (
    <div className={styles.container}>
      <Navbar title={title} theme="dark" top={false}>
        <div className={styles.header}>
          <button onClick={skip} className={styles.skip}>
            skip
          </button>
        </div>
      </Navbar>
      <div className={styles.content}>
        <Form
          isFetching={saveState.state === RequestStates.Fetching}
          nextTitle={isLast ? 'Done' : 'Next'}
          onNext={next}
          onBack={page !== 0 ? back : null}
        >
          {page === pages.Name && <Name onChange={set} profile={profile} />}
          {page === pages.Languages && (
            <Languages
              onChange={set}
              profile={profile}
              languages={filters.Language}
            />
          )}
          {page === pages.Location && (
            <Location onChange={set} profile={profile} filters={filters} />
          )}
          {page === pages.BirthDate && (
            <BirthDate onChange={set} profile={profile} />
          )}
          {page === pages.Education && (
            <Education
              onChange={set}
              profile={profile}
              education={filters.Education}
            />
          )}
          {page === pages.Intersts && (
            <Interests
              onChange={set}
              profile={profile}
              interests={filters.Interest}
            />
          )}
          {page === pages.Availability && (
            <Availability
              onChange={set}
              profile={profile}
              availability={filters.Availability}
            />
          )}
        </Form>
      </div>
    </div>
  );
}

SurveyWizard.propTypes = {
  profile: PropTypes.shape({}).isRequired,
  title: PropTypes.string,
  filters: PropTypes.shape({
    Interest: PropTypes.array,
    Education: PropTypes.array,
    Language: PropTypes.array,
    Availability: PropTypes.array,
  }).isRequired,
  userId: PropTypes.number.isRequired,
  saveState: requestStateProps.isRequired,
  onSave: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
};

SurveyWizard.defaultProps = {
  title: 'Getting Started',
};
