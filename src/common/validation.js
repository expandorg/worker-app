// @flow
import isEmail from 'validator/lib/isEmail';

import ApiError from './api/ApiError';

export const rules = {
  isNotEmpty: (str: any) => str !== '',
  isEmail: (value: any) => (typeof value === 'undefined') || isEmail(value),
};


export const validateField = (fieldValue: any, fieldRules: Array<any>) => {
  const failedRule = fieldRules
    .find(rule => !rule[0](fieldValue));
  return failedRule ? failedRule[1] : null;
};

export const validateForm = (form: Object, typeRules: Object) =>
  Object.keys(typeRules)
    .map(fieldName => validateField(form[fieldName], typeRules[fieldName]))
    .find(result => !!result);

export const validate = (data: Object, formRules: Object) => {
  const validationErrors = validateForm(data, formRules);
  if (validationErrors) {
    throw ApiError.validation(validationErrors);
  }
};
