import { connect } from 'react-redux';
import Sidebar from '../components/sidebar';

const mapStateToProps = state => ({
  isOpen: state.ui.sidebarOpen,
});

export default connect(mapStateToProps)(Sidebar);
