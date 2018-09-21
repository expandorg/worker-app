import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { NavLink, withRouter } from 'react-router-dom';

import { RequestStates, requestStateProps } from '@gemsorg/app-utils';

import Loading from './Loading';
import AnonimousNav from './AnonimousNav';

import { loggedInSelector } from '../../../selectors/userSelectors';
import { authStateSelector } from '../../../selectors/uiStateSelectors';

import { assignedTasksSelector } from '../../../selectors/tasksSelectors';

import { fetchJobs } from '../../../sagas/jobsSagas';

import { taskProps } from '../../shared/propTypes';

import './Navigation.styl';

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchJobs }, dispatch);

const mapStateToProps = state => ({
  isLoggedIn: loggedInSelector(state),
  authState: authStateSelector(state),
  assignedTasks: assignedTasksSelector(state),
});

const items = [
  {
    link: '/jobs',
    text: 'Jobs',
  },
  {
    link: '/account',
    text: 'Account',
  },
  {
    link: '/stats',
    text: 'Stats',
  },
  {
    link: '/requester',
    text: 'Requester',
  },
];

class Navigation extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    authState: requestStateProps.isRequired,
    assignedTasks: PropTypes.arrayOf(taskProps).isRequired,
    fetchJobs: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { isLoggedIn } = this.props;
    if (isLoggedIn) {
      this.props.fetchJobs();
    }
  }

  componentDidUpdate(prevProps) {
    const { isLoggedIn } = this.props;
    if (!prevProps.isLoggedIn && isLoggedIn) {
      this.props.fetchJobs();
    }
  }

  render() {
    const { isLoggedIn, assignedTasks, authState } = this.props;

    if (authState.state === RequestStates.Fetching) {
      return <Loading />;
    }

    if (!isLoggedIn) {
      return <AnonimousNav />;
    }
    return (
      <div className="gem-nav">
        {assignedTasks.length > 0 && (
          <Fragment>
            <span className="gem-nav-group">My Tasks</span>
            {assignedTasks.map(task => (
              <NavLink
                key={task.id}
                to={`/tasks/${task.id}`}
                className="gem-nav-task"
                activeClassName="gem-nav-activeTask"
              >
                {task.job ? task.job.name : `#${task.id}`}
              </NavLink>
            ))}
          </Fragment>
        )}
        {items.map(({ link, text }) => (
          <NavLink
            to={link}
            key={link}
            className="gem-nav-link"
            activeClassName="gem-nav-active"
          >
            {text}
          </NavLink>
        ))}
      </div>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Navigation)
);
