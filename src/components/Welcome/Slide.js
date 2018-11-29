import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ParallaxLayer } from 'react-spring/dist/addons';

import styles from './Slide.module.styl';

export default class Slide extends Component {
  static propTypes = {
    page: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    image: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  };

  handleClick = () => {
    const { onClick, page } = this.props;
    onClick(page + 1);
  };

  render() {
    const { image, text, page } = this.props;
    return (
      <ParallaxLayer
        className={styles.container}
        offset={page}
        speed={0.4}
        onClick={this.handleClick}
      >
        <div
          className={styles.content}
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className={styles.text}>{text}</div>
      </ParallaxLayer>
    );
  }
}
