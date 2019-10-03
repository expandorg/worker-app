import React from 'react';
import PropTypes from 'prop-types';

import { userProps } from '@expandorg/app-auth';
import { useToggle } from '@expandorg/components';

import SurveyPopup from '../../shared/Survey/SurveyPopup';

import styles from './ProfileState.module.styl';

export default function ProfileState({ profile, user }) {
  const [survey, toggleSurvey] = useToggle(false);

  return (
    <>
      <div className={styles.container}>
        <button className={styles.pie} onClick={toggleSurvey}>
          <div
            className={styles.sector}
            style={{
              backgroundImage: `
              linear-gradient(126deg, transparent 50%, #FF2D84 50%),
              linear-gradient(90deg, #FF2D84 50%, transparent 50%)`,
            }}
          />
        </button>
      </div>
      {survey && (
        <SurveyPopup
          userId={user.id}
          profile={profile}
          onHide={toggleSurvey}
          title="Edit profile"
        />
      )}
    </>
  );
}

ProfileState.propTypes = {
  profile: PropTypes.shape({}),
  user: userProps.isRequired,
};

ProfileState.defaultProps = {
  profile: null,
};
