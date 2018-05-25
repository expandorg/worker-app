import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Dialog, { DialogHeadline } from '../common/Dialog';

import { RequestStates } from '../../common/app/requestUiState';

import { jobProps, requestStateProps } from '../shared/propTypes';

import { assignJob } from '../../sagas/jobsSagas';
import { assignJobStateSelector } from '../../selectors/uiStateSelectors';

import styles from './AssignDialog.module.styl';

const mapStateToProps = state => ({
  assignState: assignJobStateSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ assignJob }, dispatch);


class AssignDialog extends Component {
  static propTypes = {
    job: PropTypes.shape(jobProps).isRequired,
    onHide: PropTypes.func.isRequired,
    assignState: PropTypes.shape(requestStateProps).isRequired,
    assignJob: PropTypes.func.isRequired,
  };

  componentWillReceiveProps({ assignState: next }) {
    const { assignState } = this.props;
    if (assignState.state === RequestStates.Fetching && next.state === RequestStates.Fetched) {
      this.props.onHide();
      // this.props.history.push('/tasks');
    }
  }

  handleAssign = () => {
    const { assignState, job } = this.props;
    if (assignState.state !== RequestStates.Fetching) {
      this.props.assignJob(job.id);
    }
  }

  handleHide = () => {
    const { assignState, onHide } = this.props;
    if (assignState.state !== RequestStates.Fetching) {
      onHide();
    }
  }


  render() {
    const { job } = this.props;
    return (
      <Dialog onHide={this.handleHide} visible contentLabel="assign" >
        <DialogHeadline>
          <span className={styles.heading}>{job.name}</span>
          <span className={styles.company}>{job.requester}</span>
        </DialogHeadline>
        <div className={styles.container}>
          <div className={styles.screenShotDescription}>
            You will see this screen
          </div>
          <img
            className={styles.screenShot}
            src={job.screenshot}
            alt={job.name}
          />
          <div className={styles.description}>
            {job.description}
          </div>
          <button className={styles.agree} onClick={this.handleAssign}>
            Agree & Continue
          </button>
        </div>
      </Dialog>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AssignDialog);
