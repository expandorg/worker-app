import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import InstallMetaMaskModal from './InstallMetaMaskModal';

import Header from './Header';
import Sidebar from './Sidebar/SidebarContainer';

import ErrorMessage from '../common/ErrorMessage';

import styles from './Page.module.styl';

export default class Page extends PureComponent {
  static propTypes = {
    children: PropTypes.element.isRequired,
    error: PropTypes.string,
    fetchAuth: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    metamask: PropTypes.bool,
  }

  static defaultProps = {
    error: null,
    metamask: true,
  }

  state = {
    sidebar: false,
  }

  componentDidMount() {
    this.props.fetchAuth();
  }

  handleClearError = () => {
    this.props.clearErrors();
  }

  handleToggleSidebar = () => {
    this.setState(({ sidebar }) => ({ sidebar: !sidebar }));
  }

  render() {
    const {
      metamask,
      children,
      error,
    } = this.props;

    const { sidebar } = this.state;

    return (
      <div className={styles.app}>
        <Header
          collapsed={sidebar}
          onToggle={this.handleToggleSidebar}
        />
        <Sidebar visible={sidebar} />
        <div className={cn(styles.container, { [styles.sbw]: sidebar })}>
          {error !== null &&
            <ErrorMessage error={error} onClose={this.handleClearError} />
          }
          {children}
        </div>
        {!metamask &&
          <InstallMetaMaskModal />
        }
      </div>
    );
  }
}
