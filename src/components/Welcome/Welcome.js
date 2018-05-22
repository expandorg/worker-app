import React, { Component } from 'react';

import DocumentTitle from 'react-document-title';

import LoginDialog from '../Auth/LoginDialog';

import Slider from '../common/Slider/Slider';

import { notAuthenticated } from '../hoc/authRules';

import styles from './Welcome.module.styl';

class Welcome extends Component {
  state = {
    opened: false,
  }
  handleToggle = () => {
    this.setState(({ opened }) => ({ opened: !opened }));
  }

  render() {
    const { opened } = this.state;
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
              <button className={styles.start} onClick={this.handleToggle}>
                Start
              </button>
            </div>
          </div>
          {opened &&
            <LoginDialog onHide={this.handleToggle} />
          }
        </div>
      </DocumentTitle>
    );
  }
}

export default notAuthenticated(Welcome);
