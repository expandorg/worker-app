import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Clipboard from 'react-clipboard.js';

import MetamaskPromt from '../shared/metamask/MetamaskPromt';

import Field from './Field';

import { metamaskStateSelector } from '../../selectors/web3Selectors';
import { assignAddress } from '../../sagas/userSagas';

import { userProps } from '../shared/propTypes';
import { userAddress } from '../../model/user';
import { MetamaskState } from '../../model/enums';

import styles from './AccountAddress.module.styl';

const mapStateToProps = state => ({
  metamaskState: metamaskStateSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ assignAddress }, dispatch);

class AccountAddress extends Component {
  static propTypes = {
    user: PropTypes.shape(userProps).isRequired,
    metamaskState: PropTypes.string.isRequired,
    assignAddress: PropTypes.func.isRequired,
  };

  state = {
    metamaskDialog: false,
  }

  handleHide = () => {
    this.setState({ metamaskDialog: false });
  }

  handleClick = () => {
    const { user, metamaskState } = this.props;
    if (metamaskState !== MetamaskState.Authorized) {
      this.setState({ metamaskDialog: true });
    } else {
      this.props.assignAddress(user);
    }
  }


  render() {
    const { user, metamaskState } = this.props;
    const { metamaskDialog } = this.state;
    const address = userAddress(user);

    return (
      <Field title="Account Address">
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.address} id="address">{address}</div>
            <Clipboard className={styles.copy} data-clipboard-text={address}>
              Copy
            </Clipboard>
          </div>
          {!address &&
            <button className={styles.assign} onClick={this.handleClick}>
              Assign
            </button>
          }
        </div>
        {metamaskDialog &&
          <MetamaskPromt
            metamaskState={metamaskState}
            action="Assign address"
            onLogin={this.props.assignAddress}
            onHide={this.handleHide}
          />
        }
      </Field>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountAddress);
