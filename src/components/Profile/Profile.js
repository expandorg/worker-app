import React from 'react';

// import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { userSelector } from '@expandorg/app-auth/selectors';

import { authenticated } from '../shared/auth';
import Page from '../shared/Page';

import Summary from './Summary/Summary';
import History from './History/History';
// import Compliments from './Compliments/Compliments';
// import Stones from './Stones/Stones';

import { profileSelector } from '../../selectors/profileSelectors';

import styles from './Profile.module.styl';

function Profile() {
  const user = useSelector(userSelector);
  const profile = useSelector(profileSelector);

  return (
    <Page title="Profile" className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Worker Profile</h1>
          {/* <Link to="" className={styles.verifier}>
            view verifier profile
          </Link> */}
        </div>
        {user && (
          <>
            <Summary user={user} profile={profile} />
            <History user={user} />
            {/* <Compliments /> */}
            {/* <Stones /> */}
          </>
        )}
      </div>
    </Page>
  );
}

export default authenticated(Profile);
