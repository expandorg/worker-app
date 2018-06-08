import React from 'react';
import PropTypes from 'prop-types';
import styles from './Answers.module.styl';

class Messages extends React.Component {
  static propTypes = {
    messageType: PropTypes.number.isRequired,
  };
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
      <div className={styles.taskContainer}>
        {this.props.messageType === 1 ?
          <div>
            <h3>Sorry, you are out of tries!</h3>
            <p className={styles.phWhiteGrey}>Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Pellentesque nec maximus turpis.
              Nullam maximus eu nislsed sollicitudin elit. Pellentesque nec
              maximus turpis. Nullam maximus eu nisl sed sollicitudin
            </p>
            <div className="btn-box">
              <button className="btn btn-pink">OK</button>
            </div>
          </div> : null}
        {this.props.messageType === 2 ?
          <div>
            <h3>Great job!</h3>
            <p className={styles.phWhiteGrey}>Lorem ipsum dolor sit amet
            consectetur adipiscing elit. Pellentesque nec maximus turpis.
            Nullam maximus eu nislsed sollicitudin. Nulla sit amet cursus quam,
            in bibendum felis. Lorem ipsum dolor sit amet, consectetur adipiscingelit.
            Pellentesque nec maximus turpis. Nullam maximus eu nisl sed sollicitudin
            </p>
            <h6>Continue with the real task and earn some gems!</h6>
            <div className="btn-box">
              <button className={styles.btnPinkTrans}>Not interested</button>
              <button className={styles.btnPink}>Start</button>
            </div>
          </div> : null}
      </div>
    );
  }
}
export default Messages;
