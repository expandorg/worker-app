import React from 'react';
import styles from './styles/General.module.styl';
import custom from './styles/Custom.module.styl';
import Rules from './rules';

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRules: false,
    };
    this.getRules = this.getRules.bind(this);
  }

  getRules() {
    this.setState({
      showRules: true,
    });
  }
  render() {
    return (
      <div>
        {!this.state.showRules ?
          <div className={styles.taskContainer}>
            <h3>Task</h3>
            <p className={styles.phWhiteGrey}>
            Your task will be to read Medium articles that have recently been
            published and decide if the articles pass Medium’s Quality Control Guidelines.
            If the article passes the guidelines you will click accept. While reading the
            article if you see it fails a guideline, stop reading and click reject.
            </p>
            <div className={custom.btnBoxTask}>
              <button
                className={styles.btnPink}
                onClick={this.getRules}
              >
                Proceed to rules
              </button>
            </div>
          </div> : null}
        {this.state.showRules ? <Rules /> : null}
      </div>
    );
  }
}
export default Task;
