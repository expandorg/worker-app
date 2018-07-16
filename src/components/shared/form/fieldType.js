// @flow
import { keyMirror } from '../../../common/utils';

const FieldType = keyMirror({
  text: null,
  number: null,
  email: null,
  password: null,
  submit: null,
  article: null,
});

export default FieldType;
