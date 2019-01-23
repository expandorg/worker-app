import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import NotificationAnimated from './NotificationAnimated';

import { clearNotification } from '../../../sagas/notificationsSagas';
import { notificationSelector } from '../../../selectors/uiStateSelectors';

const mapStateToProps = state => ({
  notification: notificationSelector(state),
});

const mapdDispatchToProps = dispatch =>
  bindActionCreators({ onClear: clearNotification }, dispatch);

export default connect(
  mapStateToProps,
  mapdDispatchToProps
)(NotificationAnimated);
