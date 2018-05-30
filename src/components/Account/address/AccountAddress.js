import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import Clipboard from 'react-clipboard.js';

import Field from '../Field';
import EditAddressDialoig from './EditAddressDialoig';

import { metamaskStateSelector } from '../../../selectors/web3Selectors';

import { userProps } from '../../shared/propTypes';

import styles from './AccountAddress.module.styl';

const mapStateToProps = state => ({
  metamaskState: metamaskStateSelector(state),
});

class AccountAddress extends Component {
  static propTypes = {
    user: PropTypes.shape(userProps).isRequired,
  };

  state = {
    edit: false,
  }

  handleEdit = () => {
    this.setState(({ edit }) => ({ edit: !edit }));
  }

  render() {
    const { user } = this.props;
    const { edit } = this.state;
    return (
      <Field title="Account Address">
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.address}>
              <span className={styles.text} id="address">{user.address}</span>
            </div>
            <Clipboard className={styles.copy} data-clipboard-text={user.address}>
              Copy
            </Clipboard>
          </div>
          <button className={styles.assign} onClick={this.handleEdit}>
            Edit
          </button>
        </div>
        {edit &&
          <EditAddressDialoig user={user} onHide={this.handleEdit} />
        }
      </Field>
    );
  }
}

export default connect(mapStateToProps)(AccountAddress);
