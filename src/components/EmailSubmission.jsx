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
    if (this.props.worker.email) {
      return <ConfirmEmailModal />;
    }
    return <AddEmailModal />;
  }
}

EmailSubmission.defaultProps = {
  worker: null,
};

EmailSubmission.propTypes = {
  worker: PropTypes.shape(workerProps),
};


export default EmailSubmission;
