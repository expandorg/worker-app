import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import Jobs from '../components/Jobs';
import { setTitle, setIsJoined } from '../actions/action-creators';

const mapStateToProps = state => ({
  worker: state.worker,
  stats: state.stats,
  error: state.error,
});

const mapDispatchToProps = {
  replace,
  setTitle,
  setIsJoined,
};

export default connect(mapStateToProps, mapDispatchToProps)(Jobs);
