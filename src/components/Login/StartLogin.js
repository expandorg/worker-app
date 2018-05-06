import React from 'react';
import PropTypes from 'prop-types';

import Content from '../shared/Content';

import Carousel from './Carousel';

import styles from './StartLogin.module.styl';

const StartLogin = ({ onStartClick }) => (
  <Content title="Login">
    <div className={styles.container}>
      <Carousel />
      <button className={styles.start} onClick={onStartClick}>
        Start
      </button>
    </div>
  </Content>
);

StartLogin.propTypes = {
  onStartClick: PropTypes.func.isRequired,
};


export default StartLogin;
