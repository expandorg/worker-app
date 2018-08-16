import React, { Component, forwardRef } from 'react';
import PropTypes from 'prop-types';

import { withServices } from '@gemsorg/components/hoc';
import { ServiceLocator } from '@gemsorg/components';

const withCurrentLocation = (Wrapped) => {
  class WithLocationWrapper extends Component {
    static propTypes = {
      forwardedRef: PropTypes.func,
      services: PropTypes.instanceOf(ServiceLocator).isRequired,
    }

     static defaultProps = {
       forwardedRef: null,
     }
     state = {
       latLng: this.props.services.resolve('location').latLng,
     }

     componentDidMount() {
       const { services } = this.props;
       const locationService = services.resolve('location');
       this.unsibscribe = locationService.findCurrent(this.handleLocated);
     }

     componentWillUnmount() {
       this.unsibscribe();
     }

     handleLocated = latLng =>
       this.setState({ latLng })

     render() {
       const { forwardedRef, services, ...rest } = this.props;
       const { latLng } = this.state;

       return <Wrapped ref={forwardedRef} latLng={latLng} {...rest} />;
     }
  }
  return withServices(
    forwardRef((props, ref) => <WithLocationWrapper {...props} forwardedRef={ref} />),
  );
};

export default withCurrentLocation;
