import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { userSelector } from '../../../selectors/userSelectors';

import ConfirmEmailDialog from './ConfirmEmailDialog';

import { userProps } from '../propTypes';

import styles from './VerifyEmailPopup.module.styl';

const mapStateToProps = state => ({
  user: userSelector(state),
});

class VerifyEmailPopup extends Component {
  static propTypes = {
    user: PropTypes.shape(userProps),
  };

  static defaultProps = {
    user: null,
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
    if (!dialog && (!user || (user.email && user.emailConfirmed))) {
      return null;
    }
    return (
      <div className={styles.container}>
        <button className={styles.confirm} onClick={this.handleToggle}>
          You need confirm email address
        </button>
        {dialog && (
          <ConfirmEmailDialog user={user} onHide={this.handleToggle} />
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps)(VerifyEmailPopup);
