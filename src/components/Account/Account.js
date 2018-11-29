import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Button, Panel } from '@gemsorg/components';

import { userSelector } from '@gemsorg/app-auth/selectors';
import { logout } from '@gemsorg/app-auth/sagas';

import Content from '../shared/Content';

import Field from './shared/Field';

import Address from './address/Address';
import Email from './email/Email';
import Password from './password/Password';

import Deposit from './gems/deposit/Deposit';
import Withdraw from './gems/withdaw/Withdraw';

import Reserved from './gems/Reserved';

import { WITHDRAW_MIN } from '../../model/balance';

import { authenticated } from '../hoc/authRules';
import { userProps } from '../shared/propTypes';

import styles from './Account.module.styl';

const mapStateToProps = state => ({
  user: userSelector(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch);

class Account extends Component {
  static propTypes = {
    user: userProps,
    logout: PropTypes.func.isRequired,
  };

  static defaultProps = {
    user: null,
  };

  render() {
    const { user } = this.props;
    if (!user) {
      return null;
    }
    return (
      <Content title="Account">
        <Panel className={styles.container}>
          <div className={styles.headline}>Your Account</div>
          <Address user={user} />
          <Email user={user} />
          <Password user={user} />
          <Reserved user={user} />
          <Field>
            <div className={styles.actions}>
              <div className={styles.gems}>
                <Deposit user={user} />
                <Withdraw user={user} />
              </div>
              <Button
                theme="white"
                className={styles.logout}
                onClick={this.props.logout}
              >
                Log Out
              </Button>
            </div>
          </Field>
          <Field>
            *Due to high demand, we require a minimum withdrawal of{' '}
            {WITHDRAW_MIN} tokens
          </Field>
        </Panel>
      </Content>
    );
  }
}

export default authenticated(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Account)
);
