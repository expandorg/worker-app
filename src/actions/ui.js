import { createAction } from 'redux-act';

const openSidebar = createAction('Open sidebar');
const closeSidebar = createAction('Close sidebar');

export {
  openSidebar,
  closeSidebar,
};

