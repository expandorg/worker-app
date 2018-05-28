import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Content from '../Content';
import Panel from '../Panel';

import { task as taskPropTypes } from '../propTypes';

const NotFound = ({ isAuthorized, task }) => (
  <Content title="Page Not Found">
    <Panel>
      {!isAuthorized &&
        <Link to="/login">Log in to get started</Link>
      }
      {isAuthorized && task !== null &&
        <Link to="/task">Go to assigned task</Link>
      }
      {isAuthorized && task === null &&
        <Link to="/jobs">Browse available jobs</Link>
      }
    </Panel>
  </Content>
);

NotFound.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  task: PropTypes.shape(taskPropTypes),
};

NotFound.defaultProps = {
  task: null,
};


export default NotFound;
