import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import DocumentTitle from 'react-document-title';

import Slider from '../common/Slider/Slider';

import styles from './Welcome.module.styl';

export default class Welcome extends Component {
  render() {
    return (
      <DocumentTitle title="Welcome">
        <div className={styles.container}>
          <div className={styles.panel}>
            <div className={styles.slider}>
              <Slider
                dots
                speed={500}
                slidesToShow={1}
                slidesToScroll={1}
                initialSlide={0}
                variableWidth={false}
              >
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
            <div className={styles.actions}>
              <Link className={styles.start} to="/login">
                Start
              </Link>
            </div>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}
