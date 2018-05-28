import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Dialog, { DialogHeadline } from '../../common/Dialog';

import Install from './Install';
import Unlock from './Unlock';
import Login from './Login';

import { MetamaskState } from '../../../model/enums';

const headers = {
  [MetamaskState.NotInstalled]: 'Please Install MetaMask',
  [MetamaskState.NotAuthorized]: 'Please Unlock MetaMask',
};

export default class MetamaskPromt extends Component {
  static propTypes = {
    metamaskState: PropTypes.string.isRequired,
    action: PropTypes.string,
    onLogin: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
  }

  static defaultProps = {
    action: 'Sign in',
  }

  render() {
    const {
      metamaskState, onLogin, onHide, action,
    } = this.props;
    const title = headers[metamaskState];
    return (
      <Dialog onHide={onHide} visible contentLabel="matamask">
        {title &&
          <DialogHeadline>
            {title}
          </DialogHeadline>
        }
        {metamaskState === MetamaskState.NotInstalled &&
          <Install />
        }
        {metamaskState === MetamaskState.NotAuthorized &&
          <Unlock />
        }
        {metamaskState === MetamaskState.Authorized &&
          <Login onLogin={onLogin} action={action} />
        }
      </Dialog>
    );
  }
}
