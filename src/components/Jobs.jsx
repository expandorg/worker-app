import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'auto-bind';
import Job from '../components/Job';
import { job as jobPropTypes } from '../schemas';

class Jobs extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {
    this.props.setTitle('Browse Jobs');
    this.props.fetchJobs();
  }

  getHandleJoin(jobId) {
    return () => this.props.assignTask(jobId);
  }

  render() {
    if (Object.getOwnPropertyNames(this.props.jobs).length <= 0) {
      return <div>There are currently no available jobs. Please check back soon!</div>;
    }
    return (
      <div>
        {Object.keys(this.props.jobs).map(
          id => (
            <Job
              key={id}
              assignedJobId={this.props.assignedJobId}
              job={this.props.jobs[id]}
              joinJob={this.getHandleJoin(id)}
            />
          ),
        )}
      </div>
    );
  }
}

Jobs.defaultProps = {
  assignedJobId: null,
};

Jobs.propTypes = {
  assignedJobId: PropTypes.string,
  assignTask: PropTypes.func.isRequired,
  fetchJobs: PropTypes.func.isRequired,
  jobs: PropTypes.objectOf(PropTypes.shape(jobPropTypes)).isRequired,
  setTitle: PropTypes.func.isRequired,
};

export default Jobs;
