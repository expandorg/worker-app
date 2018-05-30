import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { userProps } from '../propTypes';

import AddEmailModal from './AddEmailModalContainer';
import ConfirmEmailModal from './ConfirmEmailModalContainer';

export default class EmailSubmission extends Component {
  static propTypes = {
    worker: PropTypes.shape(userProps),
    onClose: PropTypes.func,
  };

  static defaultProps = {
    worker: null,
    onClose: null,
  };

  state = {
    stage: 0,
  }

  editEmail = () => {
    this.setState({ stage: 1 });
  }

  handleConfirm = () => {
    this.setState({ stage: 2 });
  }

  confirmCode = () => {
    this.setState({ stage: 3 });
  }

  render() {
    const { onClose } = this.props;
    const { stage } = this.state;
    if (stage === 3) {
      return null;
    }
    if (stage === 1) {
      return (
        <AddEmailModal onClose={this.props.onClose} confirmEmail={this.handleConfirm} />
      );
    }
    if (this.props.worker.email && !this.props.worker.confirmed) {
      return (
        <ConfirmEmailModal
          editEmail={this.editEmail}
          onClose={onClose}
          submitConfirm={this.confirmCode}
        />
      );
    }
    return <AddEmailModal onClose={onClose} />;
  }
}
