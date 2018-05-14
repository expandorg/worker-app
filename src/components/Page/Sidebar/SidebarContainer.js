import { connect } from 'react-redux';
import Sidebar from './Sidebar';

import { isAuthorizedSelector, isJoinedSelector, workerSelector, statsSelector } from '../../../selectors/userSelectors';

const mapStateToProps = state => ({
  isAuthorized: isAuthorizedSelector(state),
  isJoined: isJoinedSelector(state),
  worker: workerSelector(state),
  stats: statsSelector(state),
});


export default connect(mapStateToProps)(Sidebar);
