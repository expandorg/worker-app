import { connect } from 'react-redux';

import ErrorMessage from '../common/ErrorMessage';

import { clearErrors } from '../../sagas/appSagas';
import { errorSelector } from '../../selectors/uiStateSelectors';

const mapStateToProps = state => ({
  error: errorSelector(state),
});

const mapDispatchToProps = {
  clearErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorMessage);
