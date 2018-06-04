import BaseApi from '../common/api/BaseApi';

export class AuthApi extends BaseApi {
  getCurrentUser = () =>
    this.get('/auth')

  loginUser = ({ email, password }) =>
    this.post('/login/email', { email, password })

  loginMetamask = ({ address, signature }) =>
    this.post('/login/address', { address, signature })

  signupUser = ({ email, password }) =>
    this.post('/register/email', { email, password })

  signupMetamask = ({ address, signature }) =>
    this.post('/register/address', { address, signature })

  logout = () =>
    this.post('/logout')
}

export const authApi = new AuthApi();
