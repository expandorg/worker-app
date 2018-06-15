import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Content from '../shared/Content';
import Panel from '../shared/Panel';

import Field from './shared/Field';

import Address from './address/Address';
import Email from './email/Email';
import Password from './password/Password';

import Reserved from './gems/Reserved';
import Actions from './gems/Actions';
import AmountWarning from './gems/AmountWarning';

import { authenticated } from '../hoc/authRules';
import { userProps } from '../shared/propTypes';

import { logout } from '../../sagas/authSagas';
import { userSelector } from '../../selectors/userSelectors';

import styles from './Account.module.styl';

const mapStateToProps = state => ({
  user: userSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ logout }, dispatch);


class Account extends Component {
  static propTypes = {
    user: PropTypes.shape(userProps),
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
      <Content title="Account" >
        <Panel className={styles.container}>
          <div className={styles.headline}>Your Account</div>
          <Address user={user} />
          <Email user={user} />
          <Password user={user} />
          <Reserved user={user} />
          <Field>
            <div className={styles.actions}>
              <Actions user={user} />
              <button className={styles.logout} onClick={this.props.logout}>
                Log Out
              </button>
            </div>
          </Field>
          <Field>
            <AmountWarning />
          </Field>
        </Panel>
      </Content>
    );
  }
}

export default authenticated(connect(mapStateToProps, mapDispatchToProps)(Account));
