import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { clearErrors } from '../../sagas/appSagas';
import { errorSelector } from '../../selectors/uiStateSelectors';

import styles from './ErrorMessage.module.styl';

const mapStateToProps = state => ({
  error: errorSelector(state),
});

const mapDispatchToProps = { clearErrors };

class ErrorMessage extends Component {
  static propTypes = {
    error: PropTypes.string,
    clearErrors: PropTypes.func.isRequired,
  }

  static defaultProps = {
    error: null,
  }


  render() {
    if (!this.props.error) {
      return null;
    }
    return (
      <div className={styles.error}>
        {this.props.error.responseStatus}
        <button className={styles.close} onClick={this.props.clearErrors}>
          ✕
        </button>
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ErrorMessage);
