import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import SurveyDialog from './SurveyDialog';

import { userSelector } from '../../../selectors/userSelectors';
import { userProps } from '../propTypes';

const mapStateToProps = state => ({
  user: userSelector(state),
});

class Survey extends Component {
  static propTypes = {
    user: PropTypes.shape(userProps),
  }

  static defaultProps = {
    user: null,
  }

  state = {
    visible: true,
  }

  handleHide = () => {
    this.setState({ visible: false });
  }

  render() {
    const { user } = this.props;
    const { visible } = this.state;

    if (!user || !visible) {
      return null;
    }
    return <SurveyDialog user={user} onHide={this.handleHide} />;
  }
}

export default connect(mapStateToProps)(Survey);
