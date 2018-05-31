import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';

import { loggedInSelector, isFundedSelector } from '../../../selectors/userSelectors';
import { assignmentsStateSelector } from '../../../selectors/tasksSelector';
import { assignmentsProps } from '../../shared/propTypes';

import styles from './Navigation.module.styl';

const mapStateToProps = state => ({
  isLoggedIn: loggedInSelector(state),
  assignments: assignmentsStateSelector(state),
  isFunded: isFundedSelector(state),
});


class Navigation extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    assignments: PropTypes.shape(assignmentsProps).isRequired,
    isFunded: PropTypes.bool.isRequired,
  };


  render() {
    const { isLoggedIn, assignments, isFunded } = this.props;
    if (!isLoggedIn) {
      return null;
    }
    const assignmentIds = Reflect.ownKeys(assignments);
    return (
      <div className={styles.container}>
        {isFunded && assignmentIds.length &&
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
