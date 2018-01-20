import React, { PureComponent } from 'react';
import autoBind from 'auto-bind';
import PropTypes from 'prop-types';
import { worker as workerProps } from '../schemas';
import AddEmailModal from '../containers/AddEmailModal';
import ConfirmEmailModal from '../containers/ConfirmEmailModal';

class EmailSubmission extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      stage: 0,
    };
  }

  editEmail() {
    this.setState({ stage: 1 });
  }

  render() {
    if (this.state.stage === 1) {
      return <AddEmailModal toggleModal={this.props.toggleModal} />;
    }
    if (this.props.worker.email && !this.props.worker.confirmed) {
      return <ConfirmEmailModal editEmail={this.editEmail} toggleModal={this.props.toggleModal} />;
    }
    return <AddEmailModal toggleModal={this.props.toggleModal} />;
  }
}

EmailSubmission.defaultProps = {
  worker: null,
  toggleModal: null,
};

EmailSubmission.propTypes = {
  worker: PropTypes.shape(workerProps),
  toggleModal: PropTypes.func,
};


export default EmailSubmission;
