import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import Private from '../components/Private';

const mapStateToProps = state => ({
  isAuthorized: state.isAuthorized,
  previousJobId: state.previousJobId,
});

const mapDispatchToProps = {
  replace,
};

export default connect(mapStateToProps, mapDispatchToProps)(Private);
