import React, { PureComponent } from 'react';
import autoBind from 'auto-bind';
import PropTypes from 'prop-types';

import '../assets/hamburger.css';

class Hamburger extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      active: false,
    };
  }

  toggleMenu() {
    const currentState = this.state.active;
    this.setState({ active: !currentState });
    this.props.onClick();
  }

  render() {
    return (
      <button
        data-collapse
        className={this.state.active ? 'toggle -active' : 'toggle'}
        onClick={this.toggleMenu}
      >
        <span className="icon" />
      </button>
    );
  }
}

Hamburger.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Hamburger;
