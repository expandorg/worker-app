import { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

import withGtm from './withGtm';
import { GoogleAnalytics } from '../../../common/GoogleAnalytics';

import { locationProps } from '../../shared/propTypes';

class TrackVisit extends Component {
  static propTypes = {
    location: PropTypes.shape(locationProps).isRequired,
    gtm: PropTypes.instanceOf(GoogleAnalytics).isRequired,
  }

  componentDidUpdate({ location, gtm }) {
    if (this.props.location.pathname !== location.pathname) {
      gtm.pageview(this.props.location.pathname);
    }
  }

  render() {
    return null;
  }
}


export default withRouter(withGtm(TrackVisit));
