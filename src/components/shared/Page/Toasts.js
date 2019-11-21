import { connect } from 'react-redux';

import { NotificationAnimated } from '@expandorg/components/app';
import { clearNotification } from '@expandorg/app-utils/app';

import { notificationSelector } from '../../../selectors/ui';

export default connect(
  state => ({
    notification: notificationSelector(state),
  }),
  { onClear: clearNotification }
)(NotificationAnimated);
