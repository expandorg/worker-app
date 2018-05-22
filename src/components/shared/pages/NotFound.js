import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Content from '../Content';

import { task as taskPropTypes } from '../propTypes';

import styles from './NotFound.module.styl';

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
