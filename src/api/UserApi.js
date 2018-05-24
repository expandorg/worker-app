import BaseApi from '../common/api/BaseApi';

export class UserApi extends BaseApi {
  fetchBalance = user =>
    this.get(`/users/${user.id}/gems`)

  setEmail = ({ email }) =>
    this.postForm('/account/email/update', email)

  confirmEmail = ({ code }) =>
    this.postForm('/account/email/confirm', code)

  resendConfirmEmail = () =>
    this.get('/account/email/confirm/resend')
}

export const userApi = new UserApi();
