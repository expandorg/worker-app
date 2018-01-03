import React, { PureComponent } from 'react';
import autoBind from 'auto-bind';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import { IndexLink, Link } from 'react-router';
import { task as taskPropTypes } from '../schemas';
import { SIDEBAR_W, PADDING, BLUE } from '../style-constants';

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
  }),
  logo: css({
    marginTop: 10,
    width: 119,
    height: 50,
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
  }

  componentWillMount() {
    this.props.initWeb3();
    this.props.fetchAuth();
  }

  isHome() {
    return this.props.location.pathname === '/';
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

  render() {
    return (
      <div className={styles.app}>
        {this.props.error !== null && <div>{this.props.error}</div>}
        <div className={styles.sideBar}>
          <img className={styles.logo} src="../images/logo.svg" alt="Gems" />
          {this.renderNav()}
        </div>
        <div className={styles.container}>
          {
            this.isHome() ||
            <div className={styles.title}>
              <span className={styles.titleText}>{this.props.title}</span>
            </div>
          }
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.defaultProps = {
  error: null,
  isAuthorized: null,
  task: null,
};

App.propTypes = {
  children: PropTypes.element.isRequired,
  error: PropTypes.string,
  fetchAuth: PropTypes.func.isRequired,
  initWeb3: PropTypes.func.isRequired,
  isAuthorized: PropTypes.bool,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  task: PropTypes.shape(taskPropTypes),
  title: PropTypes.string.isRequired,
};

export default App;
