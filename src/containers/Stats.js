import { connect } from 'react-redux';
import Stats from '../components/Stats';
import { setTitle } from '../action-creators';

const mapStateToProps = state => ({
  stats: state.stats,
});

const mapDispatchToProps = {
  setTitle,
};

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
