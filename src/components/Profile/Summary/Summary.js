import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';

import { userProps } from '@expandorg/app-auth';

import ProfileState from './ProfileState';
import Rating from './Rating';

import { fetchSummary } from '../../../sagas/profileSagas';
import { profileSummarySelector } from '../../../selectors/profileSelectors';

import styles from './Summary.module.styl';

export default function Summary({ user, profile }) {
  const dispatch = useDispatch();
  const summary = useSelector(profileSummarySelector);

  useEffect(() => {
    dispatch(fetchSummary());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.account}>
        <div className={styles.name}>{profile && profile.name}</div>
        <div className={styles.email}>{user.email}</div>
        <div className={styles.rating}>
          {false && <Rating rating={profile && profile.rating} />}
        </div>
      </div>
      <div className={styles.stats}>
        <div className={styles.item}>
          <div className={styles.value}>{summary.taskSubmitted}</div>
          <div className={styles.desc}>Tasks submitted</div>
        </div>
        <div className={styles.item}>
          <div className={styles.value}>{summary.gemsEarned}</div>
          <div className={styles.desc}>XPN earned</div>
        </div>
        <div className={styles.item}>
          <ProfileState profile={profile} user={user} />
          <div className={styles.desc}>Profile</div>
        </div>
      </div>
    </div>
  );
}

Summary.propTypes = {
  user: userProps.isRequired,
  profile: PropTypes.shape({
    name: PropTypes.string,
    rating: PropTypes.number,
  }),
};

Summary.defaultProps = {
  profile: null,
};
