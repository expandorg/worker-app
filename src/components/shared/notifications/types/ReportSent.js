import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  tasksActionTypes,
  onboardingActionTypes,
} from '../../../../sagas/actionTypes';

import { notificationPayloadProps } from '../../propTypes';

import styles from './styles.module.styl';

const messages = {
  [tasksActionTypes.REPORT_COMPLETE]: 'Task report has been sent',
  [onboardingActionTypes.REPORT_COMPLETE]: 'Onboarding report has been sent',
};

export default class ReportSent extends Component {
  static propTypes = {
    payload: PropTypes.shape(notificationPayloadProps).isRequired,
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
