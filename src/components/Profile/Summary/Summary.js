import React from 'react';
import PropTypes from 'prop-types';

import { userProps } from '@expandorg/app-auth';

import ProfileState from './ProfileState';
import Rating from './Rating';

import styles from './Summary.module.styl';

export default function Summary({ user, profile }) {
  return (
    <div className={styles.container}>
      <div className={styles.account}>
        <div className={styles.name}>{profile && profile.name}</div>
        <div className={styles.email}>{user.email}</div>
        <div className={styles.rating}>
          <Rating rating={5} />
        </div>
      </div>
      <div className={styles.stats}>
        <div className={styles.item}>
          <div className={styles.value}>{3}</div>
          <div className={styles.desc}>Tasks submitted</div>
        </div>
        <div className={styles.item}>
          <div className={styles.value}>{3}</div>
          <div className={styles.desc}>Gems earned</div>
        </div>
        <div className={styles.item}>
          <ProfileState profile={profile} />
          <div className={styles.desc}>Profile</div>
        </div>
      </div>
    </div>
  );
}

Summary.propTypes = {
  user: userProps.isRequired,
  profile: PropTypes.shape({ name: PropTypes.string }),
};

Summary.defaultProps = {
  profile: null,
};
