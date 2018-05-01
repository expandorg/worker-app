import { connect } from 'react-redux';

import { statsSelector } from '../../selectors/userSelectors';

import Stats from './Stats';

const mapStateToProps = state => ({
  stats: statsSelector(state),
});


export default connect(mapStateToProps)(Stats);
