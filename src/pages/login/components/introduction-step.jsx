import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { css } from 'glamor';
import { BTN } from '../../../style-constants';
import '../../../../public/slick-theme.css';
import '../../../../public/slick.css';

const SETTINGS = {
  dots: true,
  lazyLoad: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
  variableWidth: false,
};

const styles = {
  root: css({
    width: '80%',
    margin: '10px auto',
    backgroundColor: '#fff',
  }),
  button: css({ marginTop: 30 }),
};

export default function IntroductionCarousel({ onNextStep }) {
  return (
    <div className={styles.root}>
      <div>
        <Slider {...SETTINGS}>
          <div>
            <img alt="complete tasks" src="/images/complete-tasks.png" />
            <span>Complete Tasks online</span>
          </div>
          <div>
            <img alt="earn crypto" src="/images/earn-crypto.png" />
            <span>Earn your first Crypto</span>
          </div>
          <div>
            <img alt="no middleman" src="/images/no-middleman.png" />
            <span>No Middleman fees</span>
          </div>
        </Slider>
      </div>

      <button className={`${BTN} ${styles.button}`} onClick={onNextStep}>Start</button>
    </div>
  );
}

IntroductionCarousel.defaultProps = {
  onNextStep() {},
};

IntroductionCarousel.propTypes = {
  onNextStep: PropTypes.func,
};
