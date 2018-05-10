import React from 'react';
import PropTypes from 'prop-types';

import Job from './Job';
import EmailSubmission from '../shared/EmailSubmission/EmailSubmission';

import { workerProps, statsProps, routerProps } from '../shared/propTypes';
import Content from '../shared/Content';

import Disabled from './Disabled';
import DepositPrompt from './DepositPrompt';

import { JOB_DISABLED } from '../../model/consts';

import { isWorkerFunded } from '../../model/worker';

const Jobs = ({
  stats, worker, router, setIsJoined, error,
}) => {
  if (JOB_DISABLED) {
    return <Disabled />;
  }
  return (
    <Content title="Browse Jobs">
      {(!worker.email || !worker.confirmed) && process.env.NODE_ENV === 'production' &&
        <EmailSubmission worker={worker} />
      }
      <Job
        replace={router.replace}
        setIsJoined={setIsJoined}
        error={error}
        worker={worker}
        stats={stats}
      />
      {!isWorkerFunded(worker, stats) &&
        <DepositPrompt />
      }
    </Content>
  );
};

Jobs.propTypes = {
  router: PropTypes.shape(routerProps).isRequired,
  setIsJoined: PropTypes.func.isRequired,
  worker: PropTypes.shape(workerProps),
  error: PropTypes.string,
  stats: PropTypes.shape(statsProps).isRequired,
};

Jobs.defaultProps = {
  error: null,
  worker: null,
};

export default Jobs;
