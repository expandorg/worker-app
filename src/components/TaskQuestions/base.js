import React from 'react';
import styles from './styles/Base.module.styl';
import Task from './task';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTask: false,
    };
  }
  render() {
    return (
      <div className={styles.questionPage}>
        <div className={styles.taskTitle}>
          <h2>Task title</h2>
        </div>
        <div className={styles.questionWraper}>
          {!this.state.showTask ? <Task /> : null}
        </div>
      </div>
    );
  }
}
export default Base;
