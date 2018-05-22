import isEmail from 'validator/lib/isEmail';

import ApiError from './api/ApiError';

export const rules = {
  isNotEmpty: str => str !== '',
  isEmail: value => (typeof value === 'undefined') || isEmail(value),
};


export const validateField = (fieldValue, fieldRules) => {
  const failedRule = fieldRules
    .find(rule => !rule[0](fieldValue));
  return failedRule ? failedRule[1] : null;
};

export const validateForm = (form, typeRules) =>
  Object.keys(typeRules)
    .map(fieldName => validateField(form[fieldName], typeRules[fieldName]))
    .find(result => !!result);

export const validate = (data, formRules) => {
  const validationErrors = validateForm(data, formRules);
  if (validationErrors) {
    throw ApiError.validation(validationErrors);
  }
};
