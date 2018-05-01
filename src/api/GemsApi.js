import BaseApi from '../common/api/BaseApi';

export class GemsApi extends BaseApi {
  fetchBalance = () =>
    this.get('/gems')

  depost = ({ value }) =>
    this.post('/depost', { value });

  withdraw = () =>
    this.post('/withdraw')
}

export const gemsApi = new GemsApi();
