import { createReducer } from 'redux-act';
import { openSidebar, closeSidebar } from '../actions/ui';

export default createReducer({
  [openSidebar]: state => ({
    ...state,
    sidebarOpen: true,
  }),

  [closeSidebar]: state => ({
    ...state,
    sidebarOpen: false,
  }),
}, {
  sidebarOpen: false,
});
