import { connect } from 'react-redux';

import { userSelector } from '../../selectors/userSelectors';

import { authenticated } from '../hoc/authRules';

import Stats from './Stats';

const mapStateToProps = state => ({
  user: userSelector(state),
});

export default authenticated(connect(mapStateToProps)(Stats));
