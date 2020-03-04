import React, { useMemo, memo } from 'react';
import PropTypes from 'prop-types';

import { formProps, Form, Module, FormDataProvider } from '@expandorg/modules';
import { moduleControls } from '@expandorg/modules/app';
import { previewFormGenerator } from '@expandorg/modules/model';

import styles from './ResponsePreview.module.styl';

const fd = {};

function ResponsePreview({ form, data, response, services }) {
  const preview = useMemo(() => previewFormGenerator(form), [form]);

  const variables = useMemo(
    () => ({
      ...(data || {}),
      ...(response || {}),
    }),
    [data, response]
  );

  return (
    <div className={styles.container}>
      <FormDataProvider formData={fd}>
        <Form
          form={preview}
          services={services}
          variables={variables}
          controls={moduleControls}
          onSubmit={Function.prototype}
        >
          {props => <Module {...props} />}
        </Form>
      </FormDataProvider>
    </div>
  );
}

ResponsePreview.propTypes = {
  form: formProps.isRequired,
  services: PropTypes.shape({}).isRequired,
  data: PropTypes.shape({}),
  response: PropTypes.shape({}),
};

ResponsePreview.defaultProps = {
  data: null,
  response: null,
};

export default memo(ResponsePreview);
