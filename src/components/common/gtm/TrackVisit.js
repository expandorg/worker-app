import { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

import withGtm from './withGtm';
import GtmWrapper from './GtmWrapper';

import { locationProps } from '../../shared/propTypes';

class TrackVisit extends Component {
  static propTypes = {
    location: PropTypes.shape(locationProps).isRequired,
    gtm: PropTypes.instanceOf(GtmWrapper).isRequired,
  }

  componentDidUpdate({ location, gtm }) {
    if (this.props.location.pathname !== location.pathname) {
      gtm.trigger({
        event: 'pageview',
        url: this.props.location.pathname,
      });
    }
  }

  render() {
    return null;
  }
}


export default withRouter(withGtm(TrackVisit));
