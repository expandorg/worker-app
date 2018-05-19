import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { isWorkerFunded } from '../../../model/worker';
import { loggedInSelector, isJoinedSelector, userSelector, statsSelector } from '../../../selectors/userSelectors';

import { workerProps, statsProps } from '../../shared/propTypes';

import styles from './Navigation.module.styl';

const mapStateToProps = state => ({
  isAuthorized: loggedInSelector(state),
  isJoined: isJoinedSelector(state),
  worker: userSelector(state),
  stats: statsSelector(state),
});


class Navigation extends Component {
  static propTypes = {
    isAuthorized: PropTypes.bool,
    isJoined: PropTypes.bool.isRequired,
    worker: PropTypes.shape(workerProps),
    stats: PropTypes.shape(statsProps).isRequired,
  };

  static defaultProps = {
    isAuthorized: null,
    worker: null,
  };

  render() {
    const {
      isAuthorized, isJoined, worker, stats,
    } = this.props;

    if (!isAuthorized) {
      return null;
    }
    return (
      <div className={styles.container}>
        {isJoined && isWorkerFunded(worker, stats) &&
          <NavLink to="/task" className={styles.link} activeClassName={styles.active}>
            My Task
          </NavLink>
        }
        <NavLink to="/jobs" className={styles.link} activeClassName={styles.active}>
          Jobs
        </NavLink>
        <NavLink to="/account" className={styles.link} activeClassName={styles.active}>
          Account
        </NavLink>
        <NavLink to="/stats" className={styles.link} activeClassName={styles.active}>
          Stats
        </NavLink>
        <NavLink to="/requester" className={styles.link} activeClassName={styles.active}>
          Requester
        </NavLink>
      </div>
    );
  }
}


export default connect(mapStateToProps)(Navigation);
