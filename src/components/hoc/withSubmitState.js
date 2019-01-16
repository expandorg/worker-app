import React, { Component } from 'react';
import PropTypes from 'prop-types';
import hoistStatics from 'hoist-non-react-statics';

import { connect } from 'react-redux';

import { initialRequestState, requestStateProps } from '@expandorg/app-utils';

import submitStateEffect from './submitStateEffect';

export default function withSubmitState(submitSelector) {
  const mapStateToProps = state => ({
    submitState: submitSelector(state),
  });
  const SubmitStateEffect = submitStateEffect(submitSelector);

  return Wrapped => {
    class SumbitState extends Component {
      static propTypes = {
        submitState: requestStateProps.isRequired,
        onSubmitComplete: PropTypes.func,
      };

      static defaultProps = {
        onSubmitComplete: Function.prototype,
      };

      static getDerivedStateFromProps({ submitState }, state) {
        if (state.submitted) {
          return {
            submitState,
          };
        }
        return null;
      }

      /* eslint-disable react/no-unused-state */
      state = {
        submitState: initialRequestState,
        submitted: false,
      };

      handleSubmit = submitCallback => {
        this.setState({ submitted: true }, submitCallback);
      };

      handleReset = () => {
        this.setState({ submitState: initialRequestState, submitted: false });
      };

      render() {
        const { submitState, onSubmitComplete, ...rest } = this.props;
        return (
          <SubmitStateEffect onComplete={onSubmitComplete}>
            <Wrapped
              submitState={this.state.submitState}
              onSubmit={this.handleSubmit}
              onResetSubmit={this.handleReset}
              {...rest}
            />
          </SubmitStateEffect>
        );
      }
    }
    return connect(mapStateToProps)(hoistStatics(SumbitState, Wrapped));
  };
}
