import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { workerSelector, statsSelector } from '../../selectors/userSelectors';

import Funded from './Funded';

const mapStateToProps = state => ({
  worker: workerSelector(state),
  stats: statsSelector(state),
});

export default withRouter(connect(mapStateToProps)(Funded));
