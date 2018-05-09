import { connect } from 'react-redux';

import DepositModal from './DepositModal';

import { depositGems } from '../../../sagas/gemsSagas';

import { depositStageSelector } from '../../../selectors/uiStateSelectors';

const mapStateToProps = state => ({
  depositStage: depositStageSelector(state),
});

const mapDispatchToProps = {
  depositGems,
};

export default connect(mapStateToProps, mapDispatchToProps)(DepositModal);
