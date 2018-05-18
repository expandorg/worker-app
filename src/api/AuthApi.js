import BaseApi from '../common/api/BaseApi';

export class AuthApi extends BaseApi {
  getCurrentUser = () =>
    this.get('/auth')

  loginUser = ({ email, password }) =>
    this.post('/login', { email, password })

  loginMetamask = ({ address, signature }) =>
    this.post('/login', { address, signature })

  signupUser = ({ email, password }) =>
    this.post('/register', { email, password })

  logout = () =>
    this.post('/logout')
}

export const authApi = new AuthApi();
