import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';

import { loggedInSelector, isJoinedSelector, isFundedSelector } from '../../../selectors/userSelectors';

import styles from './Navigation.module.styl';

const mapStateToProps = state => ({
  isLoggedIn: loggedInSelector(state),
  isJoined: isJoinedSelector(state),
  isFunded: isFundedSelector(state),
});


class Navigation extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool,
    isJoined: PropTypes.bool.isRequired,
    isFunded: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    isLoggedIn: false,
  };

  render() {
    const { isLoggedIn, isJoined, isFunded } = this.props;

    if (!isLoggedIn) {
      return null;
    }
    return (
      <div className={styles.container}>
        {isFunded && isJoined &&
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


export default withRouter(connect(mapStateToProps)(Navigation));
