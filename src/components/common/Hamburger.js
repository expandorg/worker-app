import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './Hamburger.css';

export default class Hamburger extends PureComponent {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  }

  state = {
    active: false,
  }

  handleClick = () => {
    this.setState(({ active }) => ({ active: !active }));
    this.props.onClick();
  }

  render() {
    const { active } = this.state;
    return (
      <button
        data-collapse
        className={active ? 'toggle -active' : 'toggle'}
        onClick={this.handleClick}
      >
        <span className="icon" />
      </button>
    );
  }
}
