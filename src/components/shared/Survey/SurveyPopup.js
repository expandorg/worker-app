import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';

import { RequestStates } from '@expandorg/app-utils';

import Navbar from '../Navbar';
import SurveyWizard from './SurveyWizard';

import { saveProfileStateSelector } from '../../../selectors/ui';
import { profileFiltersSelector } from '../../../selectors/profileSelectors';
import { saveProfile, getAllFilters } from '../../../sagas/profileSagas';

import styles from './SurveyPopup.module.styl';

export default function SurveyPopup({ userId, profile }) {
  const dispatch = useDispatch();

  const submitState = useSelector(saveProfileStateSelector);
  const filters = useSelector(profileFiltersSelector);
  const fetching = submitState.state === RequestStates.Fetching;

  useEffect(() => {
    dispatch(getAllFilters());
  });

  const submit = useCallback(
    form => {
      if (!fetching) {
        dispatch(saveProfile(userId, form));
      }
    },
    [dispatch, fetching, userId]
  );

  const hide = useCallback(() => {
    if (!fetching) {
      dispatch(saveProfile(userId, null));
    }
  }, [dispatch, fetching, userId]);

  return (
    <div className={styles.container}>
      <Navbar title="Getting Started" theme="dark" top={false}>
        <div className={styles.header}>
          <button onClick={hide} className={styles.skip}>
            skip
          </button>
        </div>
      </Navbar>
      <div className={styles.content}>
        <SurveyWizard
          profile={profile}
          filters={filters}
          submitState={submitState}
          onSubmit={submit}
        />
      </div>
    </div>
  );
}

SurveyPopup.propTypes = {
  userId: PropTypes.number.isRequired,
  profile: PropTypes.shape({}).isRequired,
};
