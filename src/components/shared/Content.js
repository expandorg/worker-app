import React from 'react';
import PropTypes from 'prop-types';

import DocumentTitle from 'react-document-title';

import VerifyEmailPopup from './email/VerifyEmailPopup';
import SurveyDialog from './profile/SurveyDialog';

import './Content.styl';

const Content = ({ children, title }) => (
  <DocumentTitle title={`${title} - Gems`}>
    <div className="gem-content">
      <VerifyEmailPopup />
      <SurveyDialog />
      <div className="gem-content-title">
        {title}
      </div>
      {children}
    </div>
  </DocumentTitle>
);

Content.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Content;
