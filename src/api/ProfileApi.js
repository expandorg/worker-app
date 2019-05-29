// @flow
import { BaseApi } from '@expandorg/api-client';

export class ProfileApi extends BaseApi {
  save = ({ profile }: Object) => this.post(`/users/profile`, profile);

  getUserProfile = () => this.get('/users/profile');
}

export const profileApi = new ProfileApi();
