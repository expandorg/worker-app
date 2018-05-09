import { connect } from 'react-redux';

import Modal from './Modal';

import { setTransactions } from '../../../sagas/gemsSagas';
import { transactionsSelector } from '../../../selectors/userSelectors';

const mapStateToProps = state => ({
  transactions: transactionsSelector(state),
});

const mapDispatchToProps = {
  setTransactions,
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
