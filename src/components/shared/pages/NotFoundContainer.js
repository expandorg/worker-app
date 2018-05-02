import { connect } from 'react-redux';
import NotFound from './NotFound';

import { isAuthorizedSelector } from '../../../selectors/userSelectors';

const mapStateToProps = state => ({
  isAuthorized: isAuthorizedSelector(state),
  task: state.task,
});

export default connect(mapStateToProps)(NotFound);
