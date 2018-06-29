import React, { Component, forwardRef } from 'react';
import PropTypes from 'prop-types';

import { locationService } from '../../services/LocationService';

const withCurrentLocation = (Wrapped) => {
  class WithLocationWrapper extends Component {
    static propTypes = {
      forwardedRef: PropTypes.func,
    }

    static defaultProps = {
      forwardedRef: null,
    }

    state = {
      latLng: locationService.latLng,
    }

    componentDidMount() {
      this.unsibscribe = locationService.findCurrent(this.handleLocated);
    }

    componentWillUnmount() {
      this.unsibscribe();
    }

    handleLocated = latLng =>
      this.setState({ latLng })

    render() {
      const { forwardedRef, ...rest } = this.props;
      const { latLng } = this.state;
      return <Wrapped ref={forwardedRef} latLng={latLng} {...rest} />;
    }
  }
  return forwardRef((props, ref) => <WithLocationWrapper {...props} forwardedRef={ref} />);
};

export default withCurrentLocation;
