import { connect } from 'react-redux';
import { withHandlers, compose } from 'recompose';
import { openSidebar, closeSidebar } from '../actions/ui';
import Header from '../components/header';

const mapDispatchToProps = {
  openSidebar,
  closeSidebar,
};

const mapStateToProps = state => ({
  sidebarActive: state.ui.sidebarOpen,
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onToggleSidebar: ({ sidebarActive, openSidebar: oSidebar, closeSidebar: cSidebar }) => () => {
      if (sidebarActive) {
        cSidebar();

        return;
      }

      oSidebar();
    },
  }),
)(Header);
