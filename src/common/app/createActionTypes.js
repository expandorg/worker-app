
// @flow
import { keyMirror } from '../utils';

const createActionTypes = (scope: string, actionTypes: Object) =>
  keyMirror(actionTypes, key => `${scope}/${key}`);

export default createActionTypes;
