import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';

import { loggedInSelector } from '../../../selectors/userSelectors';
import { assignedTasksSelector } from '../../../selectors/tasksSelector';
import { taskProps } from '../../shared/propTypes';

import styles from './Navigation.module.styl';

const mapStateToProps = state => ({
  isLoggedIn: loggedInSelector(state),
  assignedTasks: assignedTasksSelector(state),
});


class Navigation extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    assignedTasks: PropTypes.arrayOf(PropTypes.shape(taskProps)).isRequired,
  };


  render() {
    const { isLoggedIn, assignedTasks } = this.props;
    if (!isLoggedIn) {
      return null;
    }
    return (
      <div className={styles.container}>
        {assignedTasks.length > 0 &&
          <Fragment>
            <span className={styles.link}>
              My Tasks
            </span>
            {assignedTasks.map(task => (
              <NavLink
                key={task.id}
                to={`/tasks/${task.id}`}
                className={styles.task}
                activeClassName={styles.activeTask}
              >
                Task #{task.id}
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
