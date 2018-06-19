import React, { Component } from 'react';

import Header from './Header';
import Sidebar from './Sidebar/Sidebar';

import './AppPage.styl';

export default class AppPage extends Component {
  state = {
    sidebar: false,
  }

  handleToggle = () => {
    this.setState(({ sidebar }) => ({ sidebar: !sidebar }));
  }

  render() {
    const { children } = this.props;
    const { sidebar } = this.state;

    return (
      <div className="gem-page">
        <Header collapsed={sidebar} onToggle={this.handleToggle} />
        <Sidebar visible={sidebar} />
        <div className="gem-page-content">
          {children}
        </div>
      </div>
    );
  }
}
