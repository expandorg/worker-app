// @flow
import { rules, ruleMessages } from '../common/validation';

export const formRules = (modules: Array<Object>) => { //eslint-disable-line
  const rulesObject = modules.reduce((result, module) => {
    if (module.validation && module.validation.length) {
      const moduleTitle = module.name;

      result[module.name] = module.validation
        .filter(ruleName => !!rules[ruleName])
        .map(ruleName => [rules[ruleName], ruleMessages[ruleName](moduleTitle)]);
    }
    return result;
  }, {});
  return rulesObject;
};
