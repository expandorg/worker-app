import React from 'react';
import Slider from '../common/Slider/Slider';

const Carousel = () => {
  const settings = {
    dots: true,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    variableWidth: false,
  };
  return (
    <Slider {...settings}>
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
  );
};

export default Carousel;
