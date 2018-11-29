import React, { Component } from 'react';
import qs from 'query-string';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { Panel } from '@gemsorg/components';

import { userSelector } from '@gemsorg/app-auth/selectors';

import Content from '../shared/Content';

import ConfirmEmailForm from '../shared/email/ConfirmEmailForm';

import { authenticated } from '../hoc/authRules';

import { userProps, locationProps } from '../shared/propTypes';

import styles from './Confirm.module.styl';

const mapStateToProps = state => ({
  user: userSelector(state),
});

class Confirm extends Component {
  static propTypes = {
    user: userProps.isRequired,
    location: locationProps.isRequired,
  };

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
