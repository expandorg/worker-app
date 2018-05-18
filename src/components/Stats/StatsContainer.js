import { connect } from 'react-redux';

import { statsSelector } from '../../selectors/userSelectors';

import { authenticated } from '../hoc/authRules';

import Stats from './Stats';

const mapStateToProps = state => ({
  stats: statsSelector(state),
});

export default authenticated(connect(mapStateToProps)(Stats));
