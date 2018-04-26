import BaseApi from '../common/api/BaseApi';

export class UserApi extends BaseApi {
  authorize = () =>
    this.get('/auth')

  login = ({ address, signature }) =>
    this.post('/login', { address, signature })

  setEmail = ({ email }) =>
    this.post('/account/email/update', email)

  confirmEmail = ({ code }) =>
    this.post('/account/email/confirm', code)

  resendConfirmEmail = () =>
    this.get('/account/email/confirm/resend')
}

export const userApi = new UserApi();
