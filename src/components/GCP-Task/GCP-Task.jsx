import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import autoBind from 'auto-bind';
import { css } from 'glamor';
import Rating from './Rating';
import { FLEX_PANEL } from '../../style-constants';
import { gcpTask } from '../../schemas';
import mock from './mock.json';

const styles = {
  container: css(FLEX_PANEL, { flexDirection: 'column' }),
  section: css({
    flex: 1,
    margin: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  }),

  task: css({
    display: 'flex',
    flexDirection: 'row',
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
    };
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
  }

  render() {
    const { task } = this.props;

    const classes = classnames({
      [styles.submit]: true,
      [styles.activeSubmit]: this.isValidSubmit(),
    });

    return (
      <div className={styles.container}>
        <div>
          <h5 className={styles.header}>
            Please grade the following submission:
          </h5>
        </div>

        <div className={styles.task}>
          {task.visual && (
            <div className={styles.section}>
              <img src={task.visual} alt={task.description} />
            </div>
          )}

          <div className={styles.section}>
            <span className={`${styles.apostrophe} ${styles.apostropheLeft}`}> {'"'} </span>

            <p className={styles.description}>
              {task.description}
            </p>

            <span className={`${styles.apostrophe} ${styles.apostropheRight}`}> {'"'} </span>

            <div className={styles.rating}>
              <form onSubmit={this.handleSubmit}>
                <Rating
                  values={['F', 'E', 'D', 'C', 'B', 'A']}
                  selected={this.state.selected}

                  lowLabel="Poor quality"
                  highLabel="Amazing!"

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
  task: mock.noVisual,
  submitTask() {},
};

GCPTask.propTypes = {
  task: PropTypes.shape(gcpTask),
  submitTask: PropTypes.func,
};
