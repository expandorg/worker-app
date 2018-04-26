import BaseApi from '../common/api/BaseApi';

export class UserApi extends BaseApi {
  authorize = () =>
    this.get('/auth')

  login = ({ address, signature }) =>
    this.post('/login', { address, signature })
}

export const userApi = new UserApi();
