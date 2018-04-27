import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Funded from './Funded';

const mapStateToProps = state => ({
  worker: state.worker,
  stats: state.stats,
});

export default withRouter(connect(mapStateToProps)(Funded));
