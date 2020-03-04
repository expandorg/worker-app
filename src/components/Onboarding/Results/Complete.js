import React, { Component } from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { Button, Panel } from '@expandorg/components';

import { RequestStates, requestStateProps } from '@expandorg/app-utils';

import { jobProps } from '../../shared/propTypes';

import { assignJob } from '../../../sagas/jobsSagas';
import { assignJobStateSelector } from '../../../selectors/ui';

import styles from './styles.module.styl';

const mapStateToProps = state => ({
  assignState: assignJobStateSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ assignJob }, dispatch);

class OnboardingComplete extends Component {
  static propTypes = {
    job: jobProps.isRequired,

    assignState: requestStateProps.isRequired,
    assignJob: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { job } = this.props;
    if (!job.onboarding.successMessage) {
      this.handleAssign();
    }
  }

  handleAssign = () => {
    const { job } = this.props;
    this.props.assignJob(job.id);
  };

  render() {
    const { assignState, job } = this.props;
    if (!job.onboarding.successMessage) {
      return null;
    }

    return (
      <div className={styles.container}>
        <Panel className={styles.panel}>
          <h1 className={styles.heading}>Great job!</h1>
          <div className={styles.title}>{job.onboarding.successMessage}</div>
          <div className={styles.description}>
            Continue with the real task and earn some gems!
          </div>
          <div className={styles.actions}>
            <Button
              className={styles.start}
              onClick={this.handleAssign}
              disabled={assignState.state === RequestStates.Fetching}
            >
              Start
            </Button>
            <Link
              className={cn('gem-button', 'gem-button-pink', styles.back)}
              to="/"
            >
              Not interesting
            </Link>
          </div>
        </Panel>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingComplete);
