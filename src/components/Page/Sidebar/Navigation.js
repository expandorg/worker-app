import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';

import { loggedInSelector } from '../../../selectors/userSelectors';
import { assignmentsSelector } from '../../../selectors/assignmentsSelectors';
import { assignmentsProps } from '../../shared/propTypes';

import styles from './Navigation.module.styl';

const mapStateToProps = state => ({
  isLoggedIn: loggedInSelector(state),
  assignments: assignmentsSelector(state),
});


class Navigation extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    assignments: PropTypes.arrayOf(PropTypes.shape(assignmentsProps)).isRequired,
  };


  render() {
    const { isLoggedIn, assignments } = this.props;
    if (!isLoggedIn) {
      return null;
    }
    return (
      <div className={styles.container}>
        {assignments.length > 0 &&
          <Fragment>
            <span className={styles.link}>
              My Tasks
            </span>
            {assignments.map(ast => (
              <NavLink
                key={ast.taskId}
                to={`/tasks/${ast.taskId}`}
                className={styles.task}
                activeClassName={styles.activeTask}
              >
                Task #{ast.taskId}
              </NavLink>),
            )}
          </Fragment>
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
