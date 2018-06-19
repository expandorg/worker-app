import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';

import { loggedInSelector } from '../../../selectors/userSelectors';
import { authStateSelector } from '../../../selectors/uiStateSelectors';

import { assignedTasksSelector, assignedVerificationsSelector } from '../../../selectors/tasksSelectors';

import { taskProps, requestStateProps } from '../../shared/propTypes';
import { RequestStates } from '../../../common/app/requestUiState';

import './Navigation.styl';

const mapStateToProps = state => ({
  isLoggedIn: loggedInSelector(state),
  authState: authStateSelector(state),
  assignedTasks: assignedTasksSelector(state),
  assignedVerifications: assignedVerificationsSelector(state),
});


const Loading = () => (
  <div className="gem-nav">
    <div className="gem-nav-placehoder gem-nav-placehoder-1">
      <span className="gem-nav-placehoder-bg" />
    </div>
    <div className="gem-nav-placehoder gem-nav-placehoder-2">
      <span className="gem-nav-placehoder-bg" />
    </div>
  </div>
);

const Anounimous = () => (
  <div className="gem-nav">
    <NavLink to="/login" className="gem-nav-link" activeClassName="gem-nav-active">
      Login
    </NavLink>
    <NavLink to="/signup" className="gem-nav-link" activeClassName="gem-nav-active">
      Signup
    </NavLink>
  </div>
);


class Navigation extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    authState: PropTypes.shape(requestStateProps).isRequired,
    assignedTasks: PropTypes.arrayOf(PropTypes.shape(taskProps)).isRequired,
    assignedVerifications: PropTypes.arrayOf(PropTypes.shape(taskProps)).isRequired,
  };

  render() {
    const {
      isLoggedIn, assignedTasks, authState, assignedVerifications,
    } = this.props;
    if (authState.state === RequestStates.Fetching) {
      return <Loading />;
    }
    if (!isLoggedIn) {
      return <Anounimous />;
    }
    return (
      <div className="gem-nav">
        {assignedTasks.length > 0 &&
          <Fragment>
            <span className="gem-nav-link">
              My Tasks
            </span>
            {assignedTasks.map(task => (
              <NavLink
                key={task.id}
                to={`/tasks/${task.id}`}
                className="gem-nav-task"
                activeClassName="gem-nav-activeTask"
              >
                Task #{task.id}
              </NavLink>
            ))}
          </Fragment>
        }
        {assignedVerifications.length > 0 &&
          <Fragment>
            <span className="gem-nav-link">
              My Verifications
            </span>
            {assignedVerifications.map(task => (
              <NavLink
                key={task.id}
                to={`/verify/${task.id}`}
                className="gem-nav-task"
                activeClassName="gem-nav-activeTask"
              >
                Verify #{task.id}
              </NavLink>
            ))}
          </Fragment>
        }
        <NavLink to="/jobs" className="gem-nav-link" activeClassName="gem-nav-active">
          Jobs
        </NavLink>
        <NavLink to="/account" className="gem-nav-link" activeClassName="gem-nav-active">
          Account
        </NavLink>
        <NavLink to="/stats" className="gem-nav-link" activeClassName="gem-nav-active">
          Stats
        </NavLink>
        <NavLink to="/requester" className="gem-nav-link" activeClassName="gem-nav-active">
          Requester
        </NavLink>
      </div>
    );
  }
}


export default withRouter(connect(mapStateToProps)(Navigation));
