import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router';

import { task as taskPropTypes } from './shared/propTypes';

import { PANEL } from './common/style-constants';

import Content from './shared/Content';

const styles = {
  container: PANEL,
};

const NotFound = ({ isAuthorized, task }) => (
  <Content title="Page Not Found">
    <div className={styles.container}>
      {!isAuthorized &&
        <Link to="/login">Log in to get started</Link>
      }
      {isAuthorized && task !== null &&
        <Link to="/task">Go to assigned task</Link>
      }
      {isAuthorized && task === null &&
        <Link to="/jobs">Browse available jobs</Link>
      }
    </div>
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
