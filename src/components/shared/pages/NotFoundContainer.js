import { connect } from 'react-redux';
import NotFound from './NotFound';

import { loggedInSelector } from '../../../selectors/userSelectors';

const mapStateToProps = state => ({
  isAuthorized: loggedInSelector(state),
  task: state.task,
});

export default connect(mapStateToProps)(NotFound);
