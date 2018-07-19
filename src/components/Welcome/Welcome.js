import React, { Component } from 'react';

import Button from '../common/Button';

import LoginDialog from '../Auth/LoginDialog';
import Content from '../shared/Content';
import Panel from '../common/Panel';
import Gallery from './Gallery';

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
      <Content title="Login">
        <div className={styles.container}>
          <Panel className={styles.panel}>
            <Gallery />
            <div className={styles.actions}>
              <Button
                size="large"
                className={styles.start}
                onClick={this.handleToggle}
              >
                Start
              </Button>
            </div>
          </Panel>
          {opened &&
            <LoginDialog onHide={this.handleToggle} />
          }
        </div>
      </Content>
    );
  }
}

export default notAuthenticated(Welcome);
