import BaseApi from '../common/api/BaseApi';

export class UserApi extends BaseApi {
  assignAddress = ({ userId, address, signature }) =>
    this.post(`/users/${userId}/address`, { address, signature })

  fetchBalance = user =>
    this.get(`/users/${user.id}/gems`)

  setEmail = ({ email }) =>
    this.postForm('/account/email/update', email)

  confirmEmail = ({ code, userId }) =>
    this.post('/confirm', { code, userId })

  resendConfirmEmail = ({ userId }) =>
    this.post(`/users/${userId}/email/resend`)
}

export const userApi = new UserApi();
