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
  }

  render() {
    if (this.props.stage === 1) {
      return <AddEmailModal toggleModal={this.props.toggleModal} />;
    }
    if (this.props.worker.email) {
      return <ConfirmEmailModal />;
    }
    return <AddEmailModal />;
  }
}

EmailSubmission.defaultProps = {
  worker: null,
  stage: null,
  toggleModal: null,
};

EmailSubmission.propTypes = {
  worker: PropTypes.shape(workerProps),
  stage: PropTypes.number,
  toggleModal: PropTypes.func,
};


export default EmailSubmission;
