import { lifecycle, compose } from 'recompose';
import { connect } from 'react-redux';
import AppWrapper from '../components/app-wrapper';
import { refreshLogin } from '../actions/auth';
import { initWeb3 } from '../actions/web3';

const mapDispatchToProps = {
  refreshLogin,
  initWeb3,
};

export default compose(
  connect(null, mapDispatchToProps),
  lifecycle({
    componentWillMount() {
      this.props.refreshLogin();
      this.props.initWeb3();
    },
  }),
)(AppWrapper);
