import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Container from '../shared/Container';
import styles from './SuccessMessage.module.styl';

class SuccessMessage extends Component {
  static propTypes = {
    confirm: PropTypes.func.isRequired,
    pointsWon: PropTypes.number.isRequired,
  };

  render() {
    return (
      <Container>
        <div className={styles.successMsg}>
          <h3>Great job!</h3>
          <p className={styles.phWhiteBlue}>You won
            <span className={styles.pinkColor}>{this.props.pointsWon} </span>points.
          </p>
          <p className={styles.phWhiteGrey}>
            Lorem ipsum dolor sit amet
            consectetur adipiscing elit. Pellentesque nec maximus turpis.
            Nullam maximus eu nislsed sollicitudin. Nulla sit amet cursus quam,
            in bibendum felis. Lorem ipsum dolor sit amet, consectetur adipiscingelit.
            Pellentesque nec maximus turpis. Nullam maximus eu nisl sed sollicitudin
          </p>
          <h6>Continue with the real task and earn some gems!</h6>
          <div className="btn-box">
            <button className={styles.btnPink} onClick={this.props.confirm}>Start</button>
          </div>
        </div>
      </Container>
    );
  }
}
export default SuccessMessage;
