import { connect } from 'react-redux';

import { NotificationAnimated } from '@expandorg/components/app';
import { clearNotification } from '@expandorg/app-utils/app';

import { notificationSelector } from '../../selectors/ui';

const mapStateToProps = state => ({
  notification: notificationSelector(state),
});

export default connect(mapStateToProps, { onClear: clearNotification })(
  NotificationAnimated
);
