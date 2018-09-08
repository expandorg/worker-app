import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Container from './Container';
import Balance from './types/Balance';
import TxFailed from './types/TxFailed';
import ReportSent from './types/ReportSent';

import { NotificationType } from '../../../model/enums';
import { notificationProps } from '../propTypes';

export default class Notification extends Component {
  static propTypes = {
    notification: PropTypes.shape(notificationProps),
    onClear: PropTypes.func.isRequired,
  };

  static defaultProps = {
    notification: null,
  };

  renderContent({ notificationType, payload }) {
    switch (notificationType) {
      case NotificationType.Balance:
        return <Balance payload={payload} />;
      case NotificationType.TxError:
        return <TxFailed payload={payload} />;
      case NotificationType.Report:
        return <ReportSent payload={payload} />;
      default:
        break;
    }
    return null;
  }

  render() {
    const { notification, onClear } = this.props;
    if (!notification) {
      return null;
    }
    return (
      <Container onClear={onClear}>
        {this.renderContent(notification)}
      </Container>
    );
  }
}
