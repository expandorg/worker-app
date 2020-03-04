import { Component } from 'react';
import PropTypes from 'prop-types';

export default class Countdown extends Component {
  static propTypes = {
    expireIn: PropTypes.number.isRequired,
    interval: PropTypes.number,
    onFinish: PropTypes.func,
  };

  static defaultProps = {
    onFinish: Function.prototype,
    interval: 500,
  };

  constructor(props) {
    super(props);

    this.state = {
      expireAt: new Date().getTime() + props.expireIn,
      timeLeft: props.expireIn,
      finished: false,
    };
  }

  componentDidMount() {
    const { interval } = this.props;
    this.timerId = setInterval(this.handleTick, interval);
  }

  componentWillUnmount() {
    if (typeof this.timerId !== 'undefined') {
      clearInterval(this.timerId);
    }
  }

  handleTick = () => {
    const { onFinish } = this.props;
    const { expireAt, finished: alreadyFinished } = this.state;
    if (!alreadyFinished) {
      const timeLeft = expireAt - new Date().getTime();
      const finished = timeLeft <= 0;
      this.setState({ timeLeft: !finished ? timeLeft : 0, finished });
      if (finished) {
        onFinish();
      }
    }
  };

  render() {
    const { children } = this.props;
    const { finished, timeLeft } = this.state;
    return children({ finished, timeLeft });
  }
}
