import React, { Component } from 'react';

import { ToastAnimated } from '@expandorg/components';

import { assignmentProps } from '../shared/propTypes';

import styles from './TaskVerificationNotificatio.module.styl';

const isVerification = ({ responseId }) =>
  responseId !== undefined && responseId !== null;

const CLEAR_TIMEOUT = 2000;

export default class TaskVerificationNotification extends Component {
  static propTypes = {
    assignment: assignmentProps.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      task: false,
      verification: false,
    };

    this.timeoutId = null;
  }

  componentWillReceiveProps({ assignment }) {
    const { assignment: prevAssignment } = this.props;

    const task = !isVerification(assignment) && isVerification(prevAssignment);
    const verification =
      isVerification(assignment) && !isVerification(prevAssignment);
    if (task || verification) {
      this.setState({ task, verification });
      this.timeoutId = setTimeout(this.handleClear, CLEAR_TIMEOUT);
    }
  }

  componentWillUnmount() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  handleClear = () => {
    this.setState({ task: false, verification: false });
    this.timeoutId = null;
  };

  render() {
    const { task, verification } = this.state;
    return (
      <ToastAnimated visible={task || verification}>
        <div className={styles.container}>
          {verification
            ? 'This is verification task now'
            : 'This is a regular task now'}
        </div>
      </ToastAnimated>
    );
  }
}
