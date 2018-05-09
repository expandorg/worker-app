import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import DocumentTitle from 'react-document-title';

import styles from './Content.module.styl';

export default class Content extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
  }

  render() {
    const { children, title } = this.props;

    return (
      <DocumentTitle title={`${title} - Gems`}>
        <div>
          <div className={styles.title}>
            {title}
          </div>
          {children}
        </div>
      </DocumentTitle>
    );
  }
}
