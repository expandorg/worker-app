import BaseApi from '../common/api/BaseApi';

export class AuthApi extends BaseApi {
  getCurrentUser = () =>
    this.get('/auth')

  loginUser = ({ email, password }) =>
    this.post('/login', { email, password })

  loginMetamask = ({ address, signature }) =>
    this.post('/address', { address, signature })

  signupUser = ({ email, password }) =>
    this.post('/register', { email, password })

  logout = () =>
    this.get('/logout')
}

export const authApi = new AuthApi();
