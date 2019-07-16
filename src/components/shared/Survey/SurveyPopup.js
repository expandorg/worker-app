import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';

import { userProps } from '@expandorg/app-auth';
import { RequestStates } from '@expandorg/app-utils';

import Navbar from '../Navbar';
import SurveyWizard from './SurveyWizard';

import { saveProfileStateSelector } from '../../../selectors/ui';
import { saveProfile } from '../../../sagas/profileSagas';

import styles from './SurveyPopup.module.styl';

export default function SurveyPopup({ user, onHide }) {
  const dispatch = useDispatch();
  const submitState = useSelector(saveProfileStateSelector);

  const submit = useCallback(
    profile => {
      if (submitState.state !== RequestStates.Fetching) {
        dispatch(saveProfile(profile));
      }
    },
    [dispatch, submitState.state]
  );

  return (
    <div className={styles.container}>
      <Navbar title="Getting Started" theme="dark" top={false}>
        <div className={styles.header}>
          <button onClick={onHide} className={styles.skip}>
            skip
          </button>
        </div>
      </Navbar>
      <div className={styles.content}>
        <SurveyWizard user={user} submitState={submitState} onSubmit={submit} />
      </div>
    </div>
  );
}

SurveyPopup.propTypes = {
  user: userProps.isRequired,
  onHide: PropTypes.func.isRequired,
};
