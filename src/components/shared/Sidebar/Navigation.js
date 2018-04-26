import React from 'react';
import PropTypes from 'prop-types';

import { isWorkerFunded } from '../../../lib';
import { worker as workerProps, stats as statsProps } from '../propTypes';

import NavLink from './NavigationLink';

import styles from './Navigation.styles';

const Navigation = ({
  isAuthorized, isJoined, worker, stats,
}) => {
  if (!isAuthorized) {
    return (
      <ul className={styles.nav}>
        <NavLink to="/login" label="Log In" />
      </ul>
    );
  }
  return (
    <ul className={styles.nav}>
      {isJoined && isWorkerFunded(worker, stats) &&
        <NavLink to="/task" label="My Task" />
      }
      <NavLink to="/jobs" label="Jobs" />
      <NavLink to="/account" label="Account" />
      <NavLink to="/stats" label="Stats" />
      <NavLink to="/requester" label="Requester" />
    </ul>
  );
};

Navigation.propTypes = {
  isAuthorized: PropTypes.bool,
  isJoined: PropTypes.bool.isRequired,
  worker: PropTypes.shape(workerProps),
  stats: PropTypes.shape(statsProps).isRequired,
};

Navigation.defaultProps = {
  isAuthorized: null,
  worker: null,
};


export default Navigation;
