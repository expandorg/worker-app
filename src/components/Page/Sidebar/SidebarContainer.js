import { connect } from 'react-redux';
import Sidebar from './Sidebar';

import { loggedInSelector, isJoinedSelector, userSelector, statsSelector } from '../../../selectors/userSelectors';

const mapStateToProps = state => ({
  isAuthorized: loggedInSelector(state),
  isJoined: isJoinedSelector(state),
  worker: userSelector(state),
  stats: statsSelector(state),
});


export default connect(mapStateToProps)(Sidebar);
