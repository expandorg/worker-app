import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  Input,
  Button,
  Dialog,
  DialogHeadline,
  ErrorMessage,
} from '@gemsorg/components';

import { RequestStates, requestStateProps } from '@gemsorg/app-utils';
import { MetamaskState } from '@gemsorg/app-web3';

import { metamaskStateSelector } from '@gemsorg/app-web3/selectors';

import MetamaskPromt from '../../shared/metamask/MetamaskPromt';

import { assignAddressStateSelector } from '../../../selectors/uiStateSelectors';
import { assignAddress } from '../../../sagas/userSagas';

import { userProps } from '../../shared/propTypes';

import styles from './EditAddressDialoig.module.styl';

const mapStateToProps = state => ({
  metamaskState: metamaskStateSelector(state),
  assignState: assignAddressStateSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ assignAddress }, dispatch);

class EditAddressDialoig extends Component {
  static propTypes = {
    user: userProps.isRequired,
    metamaskState: PropTypes.string.isRequired,
    assignState: requestStateProps.isRequired,
    assignAddress: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      metamaskDialog: false,
      address: props.user.address || '',
      error: null,
    };
  }

  componentWillReceiveProps({ user: nextUser, assignState: nextState }) {
    const { user, assignState, onHide } = this.props;
    if (user.address !== nextUser.address) {
      this.setState({ address: nextUser.address || '', error: null });
    }
    if (nextState.error && nextState.error !== assignState.error) {
      this.setState({ error: nextState.error });
    }
    if (
      assignState.state === RequestStates.Fetching &&
      nextState.state === RequestStates.Fetched
    ) {
      onHide();
    }
  }

  handleHide = () => {
    this.setState({ metamaskDialog: false });
  };

  handleAssignClick = () => {
    const { user, metamaskState } = this.props;
    if (metamaskState !== MetamaskState.Authorized) {
      this.setState({ metamaskDialog: true });
    } else {
      this.props.assignAddress(user);
    }
  };

  handleSaveClick = () => {
    const { user } = this.props;
    if (this.state.address) {
      this.props.assignAddress(user, this.state.address);
    }
  };

  render() {
    const { metamaskState, onHide } = this.props;
    const { metamaskDialog, address, error } = this.state;

    return (
      <Dialog contentLabel="Account Address" visible onHide={onHide}>
        <DialogHeadline>Edit Address</DialogHeadline>
        <div className={styles.container}>
          <div className={styles.form}>
            <div className={styles.field}>
              <Button
                className={styles.assign}
                theme="blue"
                size="large"
                onClick={this.handleAssignClick}
              >
                <ins className={styles.fox} /> Use Metamask Address
              </Button>
              {metamaskDialog && (
                <MetamaskPromt
                  metamaskState={metamaskState}
                  action="Assign address"
                  onLogin={this.props.assignAddress}
                  onHide={this.handleHide}
                />
              )}
            </div>
            <h2 className={styles.title}>Or enter adress manually</h2>
            <div className={styles.field}>
              <Input
                type="text"
                placeholder="Ethereum address"
                value={address}
                onChange={({ target }) =>
                  this.setState({ address: target.value })
                }
              />
              <Button className={styles.save} onClick={this.handleSaveClick}>
                Save
              </Button>
              <ErrorMessage error={error} className={styles.error} />
            </div>
          </div>
        </div>
      </Dialog>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditAddressDialoig);
