import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { workerProps } from '../propTypes';

import AddEmailModal from './AddEmailModalContainer';
import ConfirmEmailModal from './ConfirmEmailModalContainer';

export default class EmailSubmission extends PureComponent {
  static propTypes = {
    worker: PropTypes.shape(workerProps),
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

  confirmEmail = () => {
    this.setState({ stage: 2 });
  }

  confirmCode = () => {
    this.setState({ stage: 3 });
  }

  render() {
    if (this.state.stage === 3) {
      return false;
    }
    if (this.state.stage === 1) {
      return (
        <AddEmailModal
          onClose={this.props.onClose}
          confirmEmail={this.confirmEmail}
        />
      );
    }
    if (this.props.worker.email && !this.props.worker.confirmed) {
      return (
        <ConfirmEmailModal
          editEmail={this.editEmail}
          onClose={this.props.onClose}
          submitConfirm={this.confirmCode}
        />
      );
    }
    return <AddEmailModal onClose={this.props.onClose} />;
  }
}
