// @flow
import { rules, ruleMessages } from '../common/validation';

export const formRules = (fields: Array<Object>) => { //eslint-disable-line
  const rulesObject = fields.reduce((result, field) => {
    if (field.validation && field.validation.length) {
      const fieldTitle = field.description || field.placeholder || field.name;
      result[field.name] = field.validation
        .filter(ruleName => !!rules[ruleName])
        .map(ruleName => [rules[ruleName], ruleMessages[ruleName](fieldTitle)]);
    }
    return result;
  }, {});
  return rulesObject;
};
