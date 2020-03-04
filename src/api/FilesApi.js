import { BaseApi } from '@expandorg/api-client';

export class FilesApi extends BaseApi {
  upload = ({ data, xhrCallbacks }) =>
    this.uploadFile(`/files/upload`, 'data', data, xhrCallbacks);
}

export const filesApi = new FilesApi();
