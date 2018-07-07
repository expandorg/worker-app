import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import ToastAnimated from '../../common/ToastAnimated';

import Notification from './Notification';

import { notificationSelector } from '../../../selectors/uiStateSelectors';

import { notificationProps } from '../../shared/propTypes';

const mapStateToProps = state => ({
  notification: notificationSelector(state),
});

class Notifications extends Component {
  static propTypes = {
    notification: PropTypes.shape(notificationProps),
  };

  static defaultProps = {
    notification: null,
  }

  render() {
    const { notification } = this.props;
    return (
      <ToastAnimated visible={!!notification}>
        <Notification notification={notification} />
      </ToastAnimated>
    );
  }
}

export default connect(mapStateToProps)(Notifications);
