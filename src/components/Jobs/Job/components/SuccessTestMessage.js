import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/General.module.styl';
import custom from '../styles/Custom.module.styl';

class SuccessTestMessage extends Component {
  static propTypes = {
    confirm: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div className={styles.taskContainer}>
        <div className={custom.successMsg}>
          <h3>Great job!</h3>
          <p className={styles.phWhiteGrey}>Lorem ipsum dolor sit amet
          consectetur adipiscing elit. Pellentesque nec maximus turpis.
          Nullam maximus eu nislsed sollicitudin. Nulla sit amet cursus quam,
          in bibendum felis. Lorem ipsum dolor sit amet, consectetur adipiscingelit.
          Pellentesque nec maximus turpis. Nullam maximus eu nisl sed sollicitudin
          </p>
          <h6>Continue with the real task and earn some gems!</h6>
          <div className="btn-box">
            <button
              className={styles.btnPinkTrans}
              onClick={this.props.cancel}
            >Not interested
            </button>
            <button className={styles.btnPink} onClick={this.props.confirm}>Start</button>
          </div>
        </div>
      </div>
    );
  }
}
export default SuccessTestMessage;
