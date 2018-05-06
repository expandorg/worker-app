import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { workerProps } from '../propTypes';

import AddEmailModal from './AddEmailModalContainer';
import ConfirmEmailModal from './ConfirmEmailModalContainer';

export default class EmailSubmission extends PureComponent {
  static propTypes = {
    worker: PropTypes.shape(workerProps),
    toggleModal: PropTypes.func,
  };

  static defaultProps = {
    worker: null,
    toggleModal: null,
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
          toggleModal={this.props.toggleModal}
          confirmEmail={this.confirmEmail}
        />
      );
    }
    if (this.props.worker.email && !this.props.worker.confirmed) {
      return (
        <ConfirmEmailModal
          editEmail={this.editEmail}
          toggleModal={this.props.toggleModal}
          submitConfirm={this.confirmCode}
        />
      );
    }
    return <AddEmailModal toggleModal={this.props.toggleModal} />;
  }
}
