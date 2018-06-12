import BaseApi from '../common/api/BaseApi';

export class UserApi extends BaseApi {
  assignAddress = ({ userId, address, signature }) =>
    this.post(`/users/${userId}/address`, { address, signature })

  fetchBalance = ({ userId }) =>
    this.get(`/users/${userId}/gems`)

  editEmail = ({ userId, email }) =>
    this.post(`/users/${userId}/email`, { email })

  confirmEmail = ({ code, userId }) =>
    this.post('/confirm', { code, userId })

  resendConfirmEmail = ({ userId }) =>
    this.post(`/users/${userId}/email/resend`)

  deposit = ({ userId, deposit }) =>
    this.post(`/users/${userId}/deposit`, { deposit });

  withdraw = ({ userId }) =>
    this.post(`/users/${userId}/withdraw`)
}

export const userApi = new UserApi();
