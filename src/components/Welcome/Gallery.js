import React, { Component, createRef } from 'react';
import cn from 'classnames';

import { Parallax, config } from 'react-spring';

import Slide from './Slide';
import Dots from './Dots';

import styles from './Gallery.module.styl';


const count = 3;


export default class Gallery extends Component {
  constructor(props) {
    super(props);

    this.parallaxRef = createRef();

    this.state = {
      active: 0,
    };
  }

  handleSlide = (to) => {
    this.setState({
      active: to < 0 ? count - 1 : (to >= count ? 0 : to), // eslint-disable-line
    }, () => {
      this.parallaxRef.current.scrollTo(this.state.active);
    });
  }

  render() {
    const { active } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.inner}>
          <Parallax
            className={styles.gallery}
            ref={this.parallaxRef}
            pages={count}
            config={config.gentle}
            horizontal
            scrolling={false}
          >
            <Slide
              page={0}
              text="Complete Tasks online"
              image="/images/complete-tasks.png"
              onClick={this.handleSlide}
            />
            <Slide
              page={1}
              text="Earn your first Crypto"
              image="/images/earn-crypto.png"
              onClick={this.handleSlide}
            />
            <Slide
              page={2}
              text="No Middleman fees"
              image="/images/no-middleman.png"
              onClick={this.handleSlide}
            />
          </Parallax>
        </div>
        <button
          className={cn(styles.arrow, styles.left)}
          onClick={() => this.handleSlide(active - 1)}
        >
          ←
        </button>
        <button
          className={cn(styles.arrow, styles.right)}
          onClick={() => this.handleSlide(active + 1)}
        >
          →
        </button>
        <Dots active={active} count={count} onSelect={this.handleSlide} />
      </div>
    );
  }
}
