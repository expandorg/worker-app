import React, { PureComponent } from 'react';
import autoBind from 'auto-bind';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { css } from 'glamor';
import Modal from './Modal';
import { job as jobPropTypes } from '../schemas';
import { PADDING, BORDER_R, PANEL } from '../style-constants';

const styles = {
  job: PANEL,
  jobLogo: css({
    width: 100,
    height: 100,
    borderRadius: BORDER_R / 2,
    background: '#eee',
    display: 'inline-block',
    verticalAlign: 'top',
  }),
  jobInfo: css({
    display: 'inline-block',
    marginLeft: PADDING / 2,
    verticalAlign: 'top',
  }),
  jobHeading: css({
    fontSize: '18px',
    fontWeight: 400,
    letterSpacing: '-0.6px',
    color: '#1c2541',
  }),
  jobRequester: css({
    fontSize: '14px',
    fontWeight: 400,
    color: '#939393',
    marginBottom: PADDING / 2,
  }),
  reward: css({
    display: 'inline-block',
    verticalAlign: 'top',
    borderRadius: BORDER_R,
    border: 'solid 1px #e0e0e0',
    padding: '0 2px 2px 9px',
    height: PADDING * 1.25,
    textAlign: 'center',
    cursor: 'default',
    marginLeft: PADDING * 2,
    lineHeight: `${PADDING * 1.25}px`,
  }),
  rewardNumber: css({
    verticalAlign: 'middle',
  }),
  rewardIcon: css({
    height: 30,
    width: 32,
    verticalAlign: 'middle',
  }),
  joinBtn: css({
    width: PADDING * 2,
    height: PADDING * 1.25,
    borderRadius: BORDER_R,
    backgroundColor: '#ff7092',
    color: '#ffffff',
    cursor: 'pointer',
    border: 0,
    ':focus': {
      outline: 0,
    },
    ':hover': {
      backgroundImage: 'linear-gradient(to bottom right,#ff7092,#FF8EA9)',
    },
  }),
  modalJob: css({
    fontSize: '24px',
    marginLeft: 24,
    lineHeight: '80px',
    letterSpacing: '-0.6px',
    textAlign: 'left',
    color: '#1c2541',
    display: 'inline-block',
  }),
  modalCompany: css({
    fontSize: '14px',
    textAlign: 'left',
    color: '#939393',
    marginLeft: 35,
    display: 'inline-block',
  }),
  screenShotDescription: css({
    fontSize: '20px',
    letterSpacing: '-0.3px',
    textAlign: 'center',
    color: '#3a506b',
    display: 'block',
    marginBottom: PADDING / 2,
  }),
  screenShot: css({
    width: 487,
    height: 247,
    display: 'block',
    margin: 'auto',
    marginBottom: PADDING * 1.5,
  }),
  description: css({
    fontSize: '16px',
    letterSpacing: '-0.2px',
    textAlign: 'center',
    color: '#3a506b',
    display: 'block',
    width: '644.5px',
    margin: 'auto',
    marginBottom: PADDING,
  }),
  agreeBtn: css({
    width: 205,
    height: 50,
    lineHeight: '50px',
    borderRadius: BORDER_R,
    backgroundColor: '#6fffe9',
    display: 'block',
    margin: 'auto',
    marginBottom: PADDING,
    fontSize: '18px',
    letterSpacing: '-0.7px',
    textAlign: 'center',
    border: 0,
    cursor: 'pointer',
    textDecoration: 'none',
    ':focus': {
      outline: 0,
    },
    ':hover': {
      backgroundImage: 'linear-gradient(to bottom right,#6fffe9,#94FFEF)',
    },
  }),
};

class Job extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      isModalOpen: false,
    };
  }

  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  renderStatus() {
    // Currently assigned job
    if (this.props.job.id === this.props.assignedJobId) {
      return <Link to="/task">Go to assigned task</Link>;
    }

    // Not currently assigned job
    if (this.props.assignedJobId !== null) {
      return '';
    }

    // No available tasks
    if (this.props.job.available_tasks === 0) {
      return <div>No available tasks</div>;
    }

    // Able to join
    return (
      <div>
        <button onClick={this.toggleModal} className={styles.joinBtn}>Join</button>
        {
          this.state.isModalOpen &&
          <Modal
            toggleModal={this.toggleModal}
            heading={(
              <div>
                <span className={styles.modalHeading}>{this.props.job.name}</span>
                <span className={styles.modalCompany}>{this.props.job.companyName}</span>
              </div>
            )}
          >
            <span className={styles.screenShotDescription}>You will see this screen </span>
            <img className={styles.screenShot} src={this.props.job.screenshot} alt="screenshot" />
            <span className={styles.description}>{this.props.job.description}</span>
            <button className={styles.agreeBtn} onClick={this.props.joinJob}>
              Agree & Continue
            </button>
          </Modal>
        }
      </div>
    );
  }

  render() {
    return (
      <div className={styles.job}>
        <img
          className={styles.jobLogo}
          src={this.props.job.logo}
          alt={this.props.job.companyName}
        />
        <div className={styles.jobInfo}>
          <div className={styles.jobHeading}>{this.props.job.name}</div>
          <div className={styles.jobRequester}>{this.props.job.companyName}</div>
          {this.renderStatus()}
        </div>
        <div className={styles.reward}>
          <span className={styles.rewardNumber}>{this.props.job.reward}</span>
          <img className={styles.rewardIcon} src="https://gems.org/images/logo.svg" alt="Gems" />
        </div>
      </div>
    );
  }
}

Job.defaultProps = {
  assignedJobId: null,
};

Job.propTypes = {
  assignedJobId: PropTypes.string,
  joinJob: PropTypes.func.isRequired,
  job: PropTypes.shape(jobPropTypes).isRequired,
};

export default Job;
