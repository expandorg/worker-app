/* global System: 1 */

import { LOGIN_PAGE } from '../constants';

const LOADABLE_MAP = {
  [LOGIN_PAGE]: () => System.import('../pages/login'),
};

export default page => LOADABLE_MAP[page];
