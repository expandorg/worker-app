import React, { Component } from 'react';
import qs from 'query-string';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { Panel } from '@expandorg/components';
import { userProps } from '@expandorg/app-auth';
import { userSelector } from '@expandorg/app-auth/selectors';
import { locationProps } from '@expandorg/app-utils';
import { ConfirmEmailForm } from '@expandorg/app-account/components';

import Page from '../shared/Page';

import { authenticated } from '../shared/auth';

import styles from './EmailConfirm.module.styl';

const mapStateToProps = (state) => ({
  user: userSelector(state),
});

class EmailConfirm extends Component {
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
      <Page title="Confirm Email">
        <Panel className={styles.container}>
          <ConfirmEmailForm code={code} user={user} />
        </Panel>
      </Page>
    );
  }
}

export default authenticated(connect(mapStateToProps)(EmailConfirm));
