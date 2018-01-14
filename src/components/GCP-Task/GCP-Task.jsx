import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import autoBind from 'auto-bind';
import { Link } from 'react-router';
import { css } from 'glamor';
import Rating from './Rating';
import Modal from '../Modal';
import { FLEX_PANEL } from '../../style-constants';
import { job as jobPropTypes, task as taskPropTypes } from '../../schemas';

const styles = {
  container: css(FLEX_PANEL, { flexDirection: 'column' }),
  section: css({
    flex: 1,
    margin: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    flexWrap: 'wrap',
    '> img': {
      maxHeight: '200px',
    },
  }),

  task: css({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  }),

  header: css({
    fontWeight: 400,
    fontSize: 20,
  }),

  description: css({
    fontStyle: 'italic',
    margin: '5px 0',
    maxHeight: 200,
    overflow: 'scroll',
  }),

  apostrophe: css({
    fontSize: 32,
    display: 'block',
    lineHeight: '10px',
    marginTop: 20,
    width: '100%',
    fontWeight: 600,
  }),

  apostropheLeft: css({
    textAlign: 'left',
  }),
  apostropheRight: css({
    textAlign: 'right',
  }),

  rating: css({
    margin: '20px 0 10px 0',
    width: '90%',
    minWidth: 300,
  }),

  submit: css({
    padding: '12px 30px',
    backgroundColor: '#1c2541',
    color: '#fff',
    fontSize: 16,
    fontWeight: 500,
    margin: '30px 0',
    position: 'relative',
    left: '50%',
    transform: 'translateX(-50%)',
    borderRadius: 3,
    border: 'none',
    opacity: 0.6,
    cursor: 'not-allowed',
  }),

  activeSubmit: css({
    opacity: 1,
    cursor: 'pointer',
  }),

  abuse: css({
    fontSize: 12,
    display: 'block',
    textAlign: 'center',
    cursor: 'pointer',
  }),
};

export default class GCPTask extends PureComponent {
  constructor() {
    super();
    autoBind(this);

    this.state = {
      selected: null,
      loading: false,
      gettingTask: false
    };
  }

  componentWillMount() {
    // if (this.props.task === null) {
    //   this.props.replace('/jobs');
    //   return;
    // }
    this.props.setTitle('Rate GCP Application');
  }

  acceptedFile(file) {
    const ext =  file.split('.').pop();
    if (ext == "gif" || ext == "jpg" || ext == "jpeg" || ext == "png") {
      return true;
    }
    return false;
  }

  isValidSubmit() {
    return Boolean(this.state.selected);
  }

  handleOnChange(val) {
    this.setState({
      selected: val === this.state.selected ? null : val,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.submitTask(this.state.selected);
    this.setState({
      seleted: null,
      loading: true,
      gettingTask: false,
    });
  }

  handleAssign(e) {
    e.preventDefault();
    this.props.assignTask(this.props.previousJobId);
    this.setState({
      loading: false,
      gettingTask: true,
    });
  }

  hasNextTask() {
    const { previousJobId } = this.props;
    if (previousJobId === null) {
      return false;
    }
    const previousJob = this.props.jobs[previousJobId];
    if (previousJob === undefined) {
      return false;
    }
    return this.props.jobs[previousJobId].availableTasks > 0;
  }

  renderNext() {
    if (this.state.gettingTask && !this.props.error) {
      return 'Loading';
    }
    return 'Next task';
  }

  renderSubmit() {
    if (this.state.loading && !this.props.error) {
      return 'Loading';
    }
    return 'Submit';
  }

  render() {
    const { task } = this.props;

    const classes = classnames({
      [styles.submit]: true,
      [styles.activeSubmit]: this.isValidSubmit(),
    });

    if (this.props.task === null) {
      return (
        <Modal
          heading={<span>Task Submitted</span>}
          toggleModal={this.toggleModal}
        >
          {this.props.task !== null && <div>Submitting task...</div>}
          {this.props.task === null && (
            <div>
              <div className={styles.heading}>Submission successful!</div>
              {
                this.hasNextTask() &&
                <button
                  className={styles.btn}
                  onClick={this.handleAssign}
                  disabled={this.state.gettingTask}
                >
                  {this.renderNext()}
                </button>
              }
              <div className={styles.heading}>
                <Link to="/jobs">Browse available jobs</Link>
              </div>
            </div>
          )}
        </Modal>
      );
    }
    console.log(this.props.task.description.replace(/(\r\n|\n|\r)/gm,""));

    const json = JSON.parse(this.props.task.description.replace(/(\r\n|\n|\r)/gm,""));
    console.log(json);
    return (
      <div className={styles.container}>
        <div>
          <h5 className={styles.header}>
            Please grade the following submission:
          </h5>
        </div>

        <div className={styles.task}>
          {json.screenshot && this.acceptedFile(json.screenshot) (
            <div className={styles.section}>
              <img src={json.screenshot} alt={json.description} />
            </div>
          )}

          <div className={styles.section}>
            <span className={`${styles.apostrophe} ${styles.apostropheLeft}`}> {'"'} </span>

            <p className={styles.description}>
              {json.description}
            </p>

            <span className={`${styles.apostrophe} ${styles.apostropheRight}`}> {'"'} </span>

            <div className={styles.rating}>
              <form onSubmit={this.handleSubmit}>
                <Rating
                  values={[':(', ':|', ':)', ':D', ':O']}
                  selected={this.state.selected}

                  lowLabel="Poor quality"
                  highLabel="Unbelievable!"

                  onChange={this.handleOnChange}
                />

                <button type="submit" className={classes}>Submit</button>

                <span className={styles.abuse}>
                  Is this submission <b>abuseful?</b> Let us know.
                </span>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

GCPTask.defaultProps = {
  previousJobId: null,
  task: null,
  error: null,
};

GCPTask.propTypes = {
  assignTask: PropTypes.func.isRequired,
  jobs: PropTypes.objectOf(PropTypes.shape(jobPropTypes)).isRequired,
  previousJobId: PropTypes.string,
  replace: PropTypes.func.isRequired,
  setPreviousJobId: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
  submitTask: PropTypes.func.isRequired,
  task: PropTypes.shape(taskPropTypes),
  fetchAuth: PropTypes.func.isRequired,
  error: PropTypes.string,
};
