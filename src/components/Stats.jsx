import React, { PureComponent } from 'react';
import autoBind from 'auto-bind';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import { stats as statsProps } from '../schemas';
import { FLEX_PANEL } from '../style-constants';

const TITLE = 'Submission Stats';

const styles = {
  container: FLEX_PANEL,
  completed: css({
    width: '30%',
    display: 'inline-block',
    border: 'solid 1px #f2f2f2',
    borderRadius: '4px',
    fontSize: '40px',
    color: '#ff7092',
    textAlign: 'center',
    paddingTop: '46px',
    paddingBottom: '46px',
    marginBottom: '25px',
    '> span': {
      fontSize: '16px',
      color: '#3a506b',
      display: 'block',
    },
  }),
};

class Stats extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {
    this.props.setTitle(TITLE);
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.completed}>
          {this.props.stats.pending || 0}
          <span>Tasks Pending*</span>
        </div>
        <div className={styles.completed}>
          {this.props.stats.accepted || 0}
          <span>Tasks Accepted</span>
        </div>
        <div className={styles.completed}>
          {this.props.stats.rejected || 0}
          <span>Tasks Rejected</span>
        </div>
        <span>*Tasks are pending acceptance</span>
      </div>
    );
  }
}


Stats.propTypes = {
  setTitle: PropTypes.func.isRequired,
  stats: PropTypes.shape(statsProps).isRequired,
};

export default Stats;
