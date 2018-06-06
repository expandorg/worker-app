import React from 'react';
import styles from './Question.module.styl';
import Instructions from './instructions';

class TaskQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTask: false,
      checked: true,
    };
    this.startTask = this.startTask.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  startTask() {
    this.setState({
      showTask: true,
    });
  }
  handleChange() {
    if (!this.state.checked) {
      this.setState({
        checked: true,
      });
    } else {
      this.setState({
        checked: false,
      });
    }
  }
  render() {
    const pink = styles.btnPink;
    const pinkTrans = styles.btnPinkTrans;
    return (
      <div className={styles.questionPage}>
        <div className={styles.taskTitle}>
          <h2>Task title</h2>
        </div>
        <div className={styles.questionWraper}>
          {!this.state.showTask ?
            <div className={styles.taskContainer}>
              <h3>Task instruction</h3>
              <p className={styles.phWhiteGrey}>Lorem ipsum dolor sit amet,
              consectetur adipiscing elit.
              Pellentesque nec maximus turpis. Nullam maximus
              eu nisl sed sollicitudin. Nulla sit amet cursus quam, in bibendum felis.
              Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Pellentesque nec maximus turpis.
              Nullam maximus eu nisl sed sollicitudin
              </p>
              <div className="btn-box">
                <button className={styles.btnBlueTrans}>Read rules</button>
              </div>
              <div className={styles.termsBox}>
                <label htmlFor="readRules">
                  I have read the instructions and I agree with the terms
                  <input type="checkbox" id="readRules" checked={this.state.checked} onChange={this.handleChange} />
                  <span className={styles.checkmark} />
                </label>
              </div>
              <div className="btn-box">
                <button
                  className={this.state.checked ? pink : pinkTrans}
                  onClick={this.startTask}
                  disabled={!this.state.checked}
                > {"Let's do this"}
                </button>
              </div>
            </div>
            : null}
          {this.state.showTask ? <Instructions /> : null}
        </div>
      </div>
    );
  }
}
export default TaskQuestion;
