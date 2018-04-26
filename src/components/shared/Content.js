import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import DocumentTitle from 'react-document-title';

import styles from './Content.styles';

export default class Content extends PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]).isRequired,
    title: PropTypes.string.isRequired,
  }

  render() {
    const { children, title } = this.props;

    return (
      <DocumentTitle title={`${title} - Gems`}>
        <div>
          <div className={styles.title}>
            <span className={styles.titleText}>
              {title}
            </span>
          </div>
          {children}
        </div>
      </DocumentTitle>
    );
  }
}
