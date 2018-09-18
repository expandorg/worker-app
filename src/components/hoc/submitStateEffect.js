import { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { RequestStates, requestStateProps } from '@gemsorg/app-utils';

export default function submitStateEffect(submitSelector) {
  const mapStateToProps = state => ({
    submitState: submitSelector(state),
  });

  class SubmitStateEffect extends Component {
    static propTypes = {
      submitState: requestStateProps.isRequired,
      onStart: PropTypes.func,
      onComplete: PropTypes.func,
      onFailed: PropTypes.func,
    };

    static defaultProps = {
      onStart: Function.prototype,
      onComplete: Function.prototype,
      onFailed: Function.prototype,
    };

    componentDidUpdate({ submitState: prev, onStart, onComplete, onFailed }) {
      const { submitState } = this.props;
      const wasFetching = prev.state === RequestStates.Fetching;
      if (!wasFetching && submitState.state === RequestStates.Fetching) {
        onStart();
      }
      if (wasFetching && submitState.state === RequestStates.Fetched) {
        onComplete();
      }
      if (wasFetching && submitState.state === RequestStates.FetchError) {
        onFailed();
      }
    }

    render() {
      const { children } = this.props;
      return children || null;
    }
  }
  return connect(mapStateToProps)(SubmitStateEffect);
}
