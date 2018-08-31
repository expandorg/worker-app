import React, { Component } from 'react';
import PropTypes from 'prop-types';
import hoistStatics from 'hoist-non-react-statics';

import { connect } from 'react-redux';

import { initialState } from '../../common/app/requestUiState';
import { requestStateProps } from '../shared/propTypes';

export default function withSubmitState(submitSelector) {
  const mapStateToProps = state => ({
    submitState: submitSelector(state),
  });

  return Wrapped => {
    class SumbitState extends Component {
      static propTypes = {
        submitState: PropTypes.shape(requestStateProps).isRequired,
      };

      /* eslint-disable react/sort-comp, react/no-unused-state */
      static getDerivedStateFromProps({ submitState }, state) {
        if (state.submitted) {
          return {
            submitState,
          };
        }
        return null;
      }

      state = {
        submitState: initialState,
        submitted: false,
      };

      handleSubmit = submitCallback => {
        this.setState({ submitted: true }, submitCallback);
      };

      handleReset = () => {
        this.setState({ submitState: initialState, submitted: false });
      };

      render() {
        const { submitState, ...rest } = this.props;
        return (
          <Wrapped
            submitState={this.state.submitState}
            onSubmit={this.handleSubmit}
            onResetSubmit={this.handleReset}
            {...rest}
          />
        );
      }
    }
    return connect(mapStateToProps)(hoistStatics(SumbitState, Wrapped));
  };
}
