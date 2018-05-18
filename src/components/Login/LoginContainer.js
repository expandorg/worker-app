import { connect } from 'react-redux';

import Login from './Login';

import { loginMetamask } from '../../sagas/authSagas';

import { notAuthenticated } from '../hoc/authRules';

const mapDispatchToProps = {
  loginMetamask,
};

export default notAuthenticated(connect(null, mapDispatchToProps)(Login));
