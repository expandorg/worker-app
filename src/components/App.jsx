import React, { PureComponent } from 'react';
import autoBind from 'auto-bind';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { css } from 'glamor';
import { IndexLink, Link } from 'react-router';
import { task as taskPropTypes } from '../schemas';
import { SIDEBAR_W, PADDING, BLUE } from '../style-constants';
import Hamburger from './Hamburger';
import InstallMetaMaskModal from './InstallMetaMaskModal';

const styles = {
  app: css({
    height: '100%',
    width: '100%',
    fontFamily: 'Poppins',
    color: BLUE,
  }),
  sideBar: css({
    width: SIDEBAR_W - PADDING,
    paddingLeft: PADDING,
    height: '100%',
    display: 'inline-block',
    background: BLUE,
    '@media(max-width: 1150px)': {
      display: 'none',
      '> img': {
        display: 'none',
      },
    },
  }),
  ib: css({
    display: 'inline-block',
    background: '#0B132B',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2,
  }),
  mobileHeader: css({
    display: 'none',
    width: '100%',
    height: '68px',
    backgroundColor: '#1c2541',
    '@media(max-width: 1150px)': {
      display: 'block',
      zIndex: 3,
    },
  }),
  logo: css({
    marginTop: 10,
    width: 119,
    height: 50,
  }),
  mobileLogoContainer: css({
    display: 'inline-block',
    width: 'calc(95% - 99px)',
    verticalAlign: 'middle',
  }),
  mobileLogo: css({
    height: 30,
    width: 30,
    textAlign: 'center',
    margin: 'auto',
    display: 'block',
  }),
  nav: css({
    padding: 0,
    listStyle: 'none',
    fontFamily: 'Poppins',
    fontSize: 18,
    fontWeight: 400,
  }),
  link: css({
    display: 'block',
    height: 40,
    cursor: 'pointer',
    opacity: 0.6,
    color: '#ffffff',
    textDecoration: 'none',
  }),
  active: css({
    opacity: 1,
  }),
  container: css({
    width: `calc(100% - ${SIDEBAR_W}px)`,
    height: '100%',
    backgroundColor: '#f2f2f2',
    display: 'inline-block',
    verticalAlign: 'top',
    '@media(max-width: 1150px)': {
      width: '100%',
    },
  }),
  sbw: css({
    marginLeft: `${SIDEBAR_W}px`,
  }),
  title: css({
    backgroundColor: '#ffffff',
    height: 70,
    boxShadow: 'inset 0 -1px 0 0 #f2f2f2',
  }),
  titleText: css({
    fontSize: 24,
    marginLeft: PADDING * 2,
    lineHeight: '70px',
    '@media(max-width: 1150px)': {
      marginLeft: '25px',
    },
  }),
  error: css({
    height: '40px',
    fontSize: 24,
    textAlign: 'center',
    verticalAlign: 'middle',
    backgroundColor: '#6fffe9',
  }),
  closeBtn: css({
    float: 'right',
    fontSize: '16px',
    display: 'inline-block',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    border: 0,
    height: '40px',
    marginRight: '25px',
    ':focus': {
      outline: '0px',
    },
  }),
  alphaMsg: css({
    display: 'block',
    position: 'fixed',
    bottom: '0',
    backgroundColor: '#1c2541',
    color: '#ffffff',
    width: 'calc(100% - 50px)',
    paddingLeft: '25px',
    paddingRight: '25px',
  }),
};

function NavLink(props) {
  const NavComponent = props.to === '/' ? IndexLink : Link;
  return (
    <li>
      <NavComponent
        to={props.to}
        className={styles.link}
        activeClassName={styles.active.toString()}
      >
        {props.label}
      </NavComponent>
    </li>
  );
}

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

class App extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      sidebar: false,
      error: true,
    };
  }

  componentWillMount() {
    this.props.initWeb3();
    this.props.fetchAuth();
  }

  closeError() {
    this.setState({ error: false });
  }

  toggleSidebar() {
    const currentState = this.state.sidebar;
    this.setState({ sidebar: !currentState });
  }

  renderNav() {
    const links = [];
    if (this.props.isAuthorized !== true) {
      links.push(<NavLink key="login" to="/login" label="Log In" />);
    } else {
      if (this.props.task !== null) {
        links.push(<NavLink key="task" to="/task" label="My Task" />);
      }
      links.push(<NavLink key="jobs" to="/jobs" label="Jobs" />);
      links.push(<NavLink key="account" to="/account" label="Account" />);
    }
    return <ul className={styles.nav}>{links}</ul>;
  }

  renderWarnings() {
    if (this.props.metamask !== true) {
      return (
        <InstallMetaMaskModal />
      );
    }
    return false;
  }

  render() {
    return (
      <div className={styles.app}>
        {this.renderWarnings()}
        <div
          className={classNames({ [styles.mobileHeader]: true, [styles.sbw]: this.state.sidebar })}
        >
          <Hamburger
            onClick={this.toggleSidebar}
            onKeyPress={this.toggleSidebar}
          />
          <div className={styles.mobileLogoContainer}>
            <img className={styles.mobileLogo} src="../images/mobile-logo.png" alt="Gems" />
          </div>
        </div>
        <div
          className={classNames({ [styles.sideBar]: true, [styles.ib]: this.state.sidebar })}
        >
          <img
            className={styles.logo}
            src="../images/logo.svg"
            alt="Gems"
          />
          {this.renderNav()}
        </div>
        <div
          className={classNames({ [styles.container]: true, [styles.sbw]: this.state.sidebar })}
        >
          {this.props.error !== null && this.state.error && (
            <div className={styles.error}>
              {this.props.error}
              <button href="#" className={styles.closeBtn} onClick={this.closeError}>
                X
              </button>
            </div>
            )
          }
          <div className={styles.title}>
            <span className={styles.titleText}>{this.props.title}</span>
          </div>
          {this.props.children}
          <div className={styles.alphaMsg}>
            <span>
              This is the Gems Alpha. All tasks are sample tasks, and
              all Gems earned are on the Ropsten test network.
            </span>
          </div>
        </div>
      </div>
    );
  }
}

App.defaultProps = {
  error: null,
  isAuthorized: null,
  task: null,
  metamask: true,
};

App.propTypes = {
  children: PropTypes.element.isRequired,
  error: PropTypes.string,
  fetchAuth: PropTypes.func.isRequired,
  initWeb3: PropTypes.func.isRequired,
  isAuthorized: PropTypes.bool,
  task: PropTypes.shape(taskPropTypes),
  title: PropTypes.string.isRequired,
  metamask: PropTypes.bool,
};

export default App;
