import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Panel } from '@gemsorg/components';

import Content from '../Content';

import { loggedInSelector } from '../../../selectors/userSelectors';

const mapStateToProps = state => ({
  isAuthorized: loggedInSelector(state),
});

const NotFound = ({ isAuthorized }) => (
  <Content title="Page Not Found">
    <Panel>
      {!isAuthorized && <Link to="/login">Log in to get started</Link>}
      {isAuthorized && <Link to="/jobs">Browse available jobs</Link>}
    </Panel>
  </Content>
);

NotFound.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(NotFound);
