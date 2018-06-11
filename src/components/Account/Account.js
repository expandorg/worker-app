import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Content from '../shared/Content';
import Panel from '../shared/Panel';

import Field from './Field';

import AccountAddress from './address/AccountAddress';
import AccountEmail from './email/AccountEmail';
import ReservedGems from './ReservedGems';
import GemsActions from './gems/Actions';

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
          <AccountAddress user={user} />
          <AccountEmail user={user} />
          <ReservedGems user={user} />
          <Field>
            <div className={styles.actions}>
              <GemsActions user={user} />
              <button className={styles.logout} onClick={this.props.logout}>
                Log Out
              </button>
            </div>
          </Field>
          <Field>
            *Due to high demand, we can only let you withdraw if you have over 500 GEM tokens
          </Field>
        </Panel>
      </Content>
    );
  }
}

export default authenticated(connect(mapStateToProps, mapDispatchToProps)(Account));
