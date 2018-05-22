import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MetamaskPromt from '../../shared/metamask/MetamaskPromt';

import { metamaskStateSelector } from '../../../selectors/web3Selectors';
import { loginMetamask } from '../../../sagas/authSagas';

import { MetamaskState } from '../../../model/enums';

import styles from './MatamaskLogin.module.styl';

const mapStateToProps = state => ({
  metamaskState: metamaskStateSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loginMetamask }, dispatch);

class MatamaskLogin extends Component {
  static propTypes = {
    metamaskState: PropTypes.string.isRequired,
    loginMetamask: PropTypes.func.isRequired,
  }

  state = {
    metamaskDialog: false,
  }

  handleHide = () => {
    this.setState({ metamaskDialog: false });
  }

  handleClick = () => {
    if (this.props.metamaskState !== MetamaskState.Authorized) {
      this.setState({ metamaskDialog: true });
    } else {
      this.props.loginMetamask();
    }
  }

  render() {
    const { metamaskState } = this.props;
    const { metamaskDialog } = this.state;
    return (
      <div className={styles.container}>
        <button className={styles.login} onClick={this.handleClick}>
          <ins className={styles.fox} /> Login with MetaMask
        </button>
        {metamaskDialog &&
          <MetamaskPromt
            metamaskState={metamaskState}
            onLogin={this.props.loginMetamask}
            onHide={this.handleHide}
          />
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MatamaskLogin);
