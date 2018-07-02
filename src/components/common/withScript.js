import React, { Component, forwardRef } from 'react';
import PropTypes from 'prop-types';

const loaded = new Set();

const withScript = (src, async = true, defer = false, disabled = false) => (Wrapped) => {
  class WithScriptWrapper extends Component {
    static propTypes = {
      forwardedRef: PropTypes.func,
      onLoad: PropTypes.func,
    }

    static defaultProps = {
      forwardedRef: null,
      onLoad: Function.prototype,
    }

    componentDidMount() {
      if (disabled) {
        return;
      }
      const { onLoad } = this.props;
      if (loaded.has(src)) {
        return;
      }
      loaded.add(src);
      const script = document.createElement('script');
      script.src = src;
      script.async = async;
      script.defer = defer;
      script.onload = () => {
        onLoad();
      };
      document.body.appendChild(script);
    }

    render() {
      const { forwardedRef, ...rest } = this.props;
      return <Wrapped ref={forwardedRef} {...rest} />;
    }
  }

  return forwardRef((props, ref) => <WithScriptWrapper {...props} forwardedRef={ref} />);
};

export default withScript;
