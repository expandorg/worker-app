import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { NavLink, withRouter } from 'react-router-dom';

import Loading from './Loading';
import AnonimousNav from './AnonimousNav';

import { loggedInSelector } from '../../../selectors/userSelectors';
import { authStateSelector } from '../../../selectors/uiStateSelectors';

import {
  assignedTasksSelector,
  assignedVerificationsSelector,
} from '../../../selectors/tasksSelectors';

import { fetchJobs } from '../../../sagas/jobsSagas';

import { taskProps, requestStateProps } from '../../shared/propTypes';
import { RequestStates } from '../../../common/app/requestUiState';

import './Navigation.styl';

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchJobs }, dispatch);

const mapStateToProps = state => ({
  isLoggedIn: loggedInSelector(state),
  authState: authStateSelector(state),
  assignedTasks: assignedTasksSelector(state),
  assignedVerifications: assignedVerificationsSelector(state),
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

const Tasks = ({ title, tasks, url }) => (
  <Fragment>
    <span className="gem-nav-group">{title}</span>
    {tasks.map(task => (
      <NavLink
        key={task.id}
        to={`/${url}/${task.id}`}
        className="gem-nav-task"
        activeClassName="gem-nav-activeTask"
      >
        {task.job ? task.job.name : `#${task.id}`}
      </NavLink>
    ))}
  </Fragment>
);

Tasks.propTypes = {
  title: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.shape(taskProps)).isRequired,
  url: PropTypes.string.isRequired,
};

class Navigation extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    authState: PropTypes.shape(requestStateProps).isRequired,
    assignedTasks: PropTypes.arrayOf(PropTypes.shape(taskProps)).isRequired,
    assignedVerifications: PropTypes.arrayOf(PropTypes.shape(taskProps))
      .isRequired,
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
    const {
      isLoggedIn,
      assignedTasks,
      authState,
      assignedVerifications,
    } = this.props;

    if (authState.state === RequestStates.Fetching) {
      return <Loading />;
    }

    if (!isLoggedIn) {
      return <AnonimousNav />;
    }
    return (
      <div className="gem-nav">
        {assignedTasks.length > 0 && (
          <Tasks tasks={assignedTasks} title="My Tasks" url="tasks" />
        )}
        {assignedVerifications.length > 0 && (
          <Tasks
            tasks={assignedVerifications}
            title="My Verifications"
            url="verify"
          />
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
