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

  changePassword = ({ userId, newPassword, oldPassword }) =>
    this.post(`/users/${userId}/password`, { newPassword, oldPassword })

  resetPassword = ({ email }) =>
    this.post('/password/reset', { email })

  restorePassword = ({ password, code }) =>
    this.post('/password/restore', { password, code })

  deposit = ({ userId, deposit }) =>
    this.post(`/users/${userId}/deposit`, { deposit });

  withdraw = ({ userId, withdrawal }) =>
    this.post(`/users/${userId}/withdraw`, { withdrawal })
}

export const userApi = new UserApi();
