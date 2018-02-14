import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import Funded from '../components/Funded';

const mapStateToProps = state => ({
  worker: state.worker,
  stats: state.stats,
});

const mapDispatchToProps = {
  replace,
};

export default connect(mapStateToProps, mapDispatchToProps)(Funded);
