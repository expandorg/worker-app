import React, { Component } from 'react';

import {
  assignmentActionTypes,
  onboardingActionTypes,
} from '../../../../sagas/actionTypes';

import { notificationPayloadProps } from '../../propTypes';

import styles from './styles.module.styl';

const messages = {
  [assignmentActionTypes.REPORT_COMPLETE]: 'Task report has been sent',
  [onboardingActionTypes.REPORT_COMPLETE]: 'Onboarding report has been sent',
};

export default class ReportSent extends Component {
  static propTypes = {
    payload: notificationPayloadProps.isRequired,
  };

  render() {
    const { type } = this.props.payload;
    return (
      <div className={styles.content}>
        {messages[type] || 'Report has been sent'}
      </div>
    );
  }
}
