import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Link } from 'react-router-dom';

import { Dialog, Button, DialogForm as DF } from '@expandorg/components';

import { onboardingProps } from '../../shared/propTypes';

export default function GroupFaildDialog({ onboarding, onHide }) {
  return (
    <Dialog onHide={onHide} visible hideButton contentLabel="onboarding group">
      <DF.Container>
        <DF.Title>Sorry, wrong answer!</DF.Title>
        <DF.Description>{onboarding.message}</DF.Description>

        {onboarding.allowedRetries && (
          <DF.Description bold>
            {1 + onboarding.allowedRetries - onboarding.currentTry} tries left
          </DF.Description>
        )}
        <DF.Actions>
          <Link
            className={cn(
              'gem-button',
              'gem-button-grey',
              'gem-dialogform-button'
            )}
            to="/"
          >
            Give up
          </Link>
          <Button
            theme="pink"
            onClick={onHide}
            className="gem-dialogform-button"
          >
            Try again
          </Button>
        </DF.Actions>
      </DF.Container>
    </Dialog>
  );
}

GroupFaildDialog.propTypes = {
  onboarding: onboardingProps.isRequired,
  onHide: PropTypes.func.isRequired,
};
