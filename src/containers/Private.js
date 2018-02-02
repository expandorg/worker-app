import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import Private from '../components/Private';

const mapStateToProps = state => ({
  isAuthorized: state.isAuthorized,
  isJoined: state.isJoined,
});

const mapDispatchToProps = {
  replace,
};

export default connect(mapStateToProps, mapDispatchToProps)(Private);
