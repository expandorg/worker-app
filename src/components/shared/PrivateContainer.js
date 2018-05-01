import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Private from './Private';

import { isAuthorizedSelector, isJoinedSelector, workerSelector, statsSelector } from '../../selectors/userSelectors';

const mapStateToProps = state => ({
  isAuthorized: isAuthorizedSelector(state),
  isJoined: isJoinedSelector(state),
  worker: workerSelector(state),
  stats: statsSelector(state),
});


export default withRouter(connect(mapStateToProps)(Private));
