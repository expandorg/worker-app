import React, { Component } from 'react';

import { Tooltip } from '@expandorg/components';
import { userProps } from '@expandorg/app-auth';

import { ReactComponent as I } from '@expandorg/uikit/assets/i.svg';

import { ConfirmEmailDialog } from '@expandorg/app-account/components';

import styles from './ToggleEmailConfirm.module.styl';

const Btn = Tooltip(({ children, ...rest }) => (
  <button className={styles.btn} {...rest}>
    <I width="14" height="14" viewBox="0 0 12 12" className={styles.warning} />
    {children}
  </button>
));

export default class ToggleEmailConfirm extends Component {
  static propTypes = {
    user: userProps.isRequired,
  };

  state = {
    dialog: false,
  };

  handleToggle = () => {
    this.setState(({ dialog }) => ({ dialog: !dialog }));
  };

  render() {
    const { user } = this.props;
    const { dialog } = this.state;
    if (!user.email) {
      return null;
    }

    return (
      <>
        {!user.emailConfirmed && (
          <Btn onClick={this.handleToggle} tooltip="Confirm Email Address" />
        )}
        {dialog && (
          <ConfirmEmailDialog user={user} onHide={this.handleToggle} />
        )}
      </>
    );
  }
}
