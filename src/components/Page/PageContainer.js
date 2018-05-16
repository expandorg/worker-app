import { connect } from 'react-redux';
import Page from './Page';

import { clearErrors } from '../../sagas/appSagas';
import { fetchAuth } from '../../sagas/userSagas';
import { errorSelector, metamaskSelector } from '../../selectors/uiStateSelectors';

const mapStateToProps = state => ({
  error: errorSelector(state),
  metamask: metamaskSelector(state),
});

const mapDispatchToProps = {
  fetchAuth,
  clearErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
