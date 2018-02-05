import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'auto-bind';
import Job from '../components/Job';
import { worker as workerProps } from '../schemas';
import { PANEL } from '../style-constants';
import EmailSubmission from './EmailSubmission';

const JOB_DISABLED = false;

const styles = {
  innerContainer: PANEL,
};

class Jobs extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {
    this.props.setTitle('Browse Jobs');
  }

  renderEmailModal() {
    if (process.env.NODE_ENV !== 'production') {
      return true;
    }
    if (!this.props.worker.email || !this.props.worker.confirmed) {
      return (
        <EmailSubmission worker={this.props.worker} />
      );
    }
    return false;
  }

  render() {
    if (JOB_DISABLED) {
      return (
        <div className={styles.innerContainer}>
          There are currently no available jobs. Please check back soon!
        </div>
      );
    }
    return (
      <div>
        {this.renderEmailModal()}
        <Job
          replace={this.props.replace}
          setIsJoined={this.props.setIsJoined}
          error={this.props.error}
        />
      </div>
    );
  }
}

Jobs.defaultProps = {
  error: null,
  worker: null,
};

Jobs.propTypes = {
  replace: PropTypes.func.isRequired,
  setIsJoined: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
  worker: PropTypes.shape(workerProps),
  error: PropTypes.string,
};

export default Jobs;
