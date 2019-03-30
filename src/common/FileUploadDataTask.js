// @flow
import { FileUploadTask } from '@expandorg/modules';
import { type XhrCallbacks } from '@expandorg/api-client/src/Xhr';

import { filesApi } from '../api/FilesApi';

export default class FileUploadDataTask extends FileUploadTask {
  cb: ?XhrCallbacks = null;
  aborted: boolean = false;

  upload = async () => {
    this.cb = { onProgress: this.handleProgress };

    const { fileUrl } = await filesApi.upload({
      data: this.file,
      xhrCallbacks: this.cb,
    });

    this.cb = null;

    return { fileUrl };
  };

  handleProgress = ({ loaded, total }: Object) => {
    this.onProgress(loaded / total);
  };

  abort = () => {
    if (!this.aborted && this.cb && this.cb.abort) {
      this.aborted = true;
      this.cb.abort();
    }
  };

  cancel = () => {
    this.abort();
  };
}
