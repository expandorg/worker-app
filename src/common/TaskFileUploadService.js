// @flow
import { FileUploadServiceBase } from '@expandorg/modules';

import FileUploadDataTask from './FileUploadDataTask';

export default class TaskFileUploadService extends FileUploadServiceBase {
  constructor() {
    super(FileUploadDataTask);
  }
}
