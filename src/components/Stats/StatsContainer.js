import { connect } from 'react-redux';

import Stats from './Stats';

const mapStateToProps = state => ({
  stats: state.stats,
});


export default connect(mapStateToProps)(Stats);
