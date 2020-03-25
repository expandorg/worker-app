import React from 'react';
import PropTypes from 'prop-types';

import { userProps } from '@expandorg/app-auth';
import { useToggle } from '@expandorg/components';

import SurveyPopup from '../../shared/Survey/SurveyPopup';

import styles from './ProfileState.module.styl';

const getProfileFillPercentage = (profile) => {
  if (!profile) {
    return 0;
  }

  if (profile.state === 'not_filled') {
    return 0;
  }

  if (!profile.attributes) {
    return 0;
  }

  const { Language, Education, Interest } = profile.attributes;

  const score =
    (profile.name ? 1 : 0) +
    (profile.birthdate ? 1 : 0) +
    (profile.country ? 1 : 0) +
    (profile.locality ? 1 : 0) +
    (profile.city ? 1 : 0) +
    (Language && Language.length ? 1 : 0) +
    (Education && Education.length ? 1 : 0) +
    (Interest && Interest.length ? 1 : 0);

  return score / 8;
};

export default function ProfileState({ profile, user }) {
  const [survey, toggleSurvey] = useToggle(false);

  const fill = getProfileFillPercentage(profile);

  return (
    <>
      <div className={styles.container}>
        <button className={styles.button} onClick={toggleSurvey}>
          <svg
            className={styles.svg}
            width="72"
            height="72"
            viewBox="0 0 120 120"
          >
            <circle
              className={styles.empty}
              r="40"
              cx="60"
              cy="60"
              fill="transparent"
              strokeDasharray="251.3"
              strokeDashoffset="0"
            />
            <circle
              className={styles.bar}
              style={{ strokeDashoffset: (1 - fill) * Math.PI * (40 * 2) }}
              r="40"
              cx="60"
              cy="60"
              fill="transparent"
              strokeDasharray="251.3"
            />
          </svg>
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
