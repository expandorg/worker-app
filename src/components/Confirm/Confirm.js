import React, { Component } from 'react';
import PropTypes from 'prop-types';
import qs from 'query-string';

import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';


import Content from '../shared/Content';
import Panel from '../common/Panel';
import ConfirmEmailForm from '../shared/email/ConfirmEmailForm';

import { authenticated } from '../hoc/authRules';

import { userSelector } from '../../selectors/userSelectors';
import { userProps, locationProps } from '../shared/propTypes';

import styles from './Confirm.module.styl';

const mapStateToProps = state => ({
  user: userSelector(state),
});

class Confirm extends Component {
  static propTypes = {
    user: PropTypes.shape(userProps).isRequired,
    location: PropTypes.shape(locationProps).isRequired,
  }

  constructor(props) {
    super(props);
    const query = qs.parse(props.location.search);
    this.state = {
      code: query.code || null,
    };
  }

  render() {
    const { user } = this.props;
    const { code } = this.state;
    if (user.emailConfirmed) {
      return <Redirect to="/account" />;
    }
    return (
      <Content title="Confirm email">
        <Panel className={styles.container}>
          <div className={styles.description}>
            Enter the confirmation code that was sent to your email
          </div>
          <ConfirmEmailForm code={code} user={user} />
        </Panel>
      </Content>
    );
  }
}

export default authenticated(connect(mapStateToProps)(Confirm));
