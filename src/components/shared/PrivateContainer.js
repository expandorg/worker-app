import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Private from './Private';

const mapStateToProps = state => ({
  isAuthorized: state.isAuthorized,
  isJoined: state.isJoined,
  worker: state.worker,
  stats: state.stats,
});


export default withRouter(connect(mapStateToProps)(Private));
