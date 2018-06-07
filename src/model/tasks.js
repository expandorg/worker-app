// @flow
import { TaskFieldType } from './enums';
import { rules, ruleMessages } from '../common/validation';

export class FormBuilder {
  static getDefaultValue = (type: string) => {
    switch (type) {
      case TaskFieldType.text:
        return '';
      default:
        break;
    }
    return '';
  }

  static defaultValues(fields: Array<Object>): Object {
    return fields.reduce((result, field) => {
      const defaultValue = typeof field.default !== 'undefined'
        ? field.default
        : FormBuilder.getDefaultValue(field.type);

      result[field.name] = defaultValue;
      return result;
    }, {});
  }

  static validation(fields: Array<Object>) {
    const formRules = fields.reduce((result, field) => {
      if (field.validation && field.validation.length) {
        const fieldName = field.description || field.placeholder || field.name;
        result[field.name] = field.validation
          .filter(ruleName => !!rules[ruleName])
          .map(ruleName => [rules[ruleName], ruleMessages[ruleName](fieldName)]);
      }
      return result;
    }, {});
    return formRules;
  }
}


export const triviaForm = {
  name: 'Trivia',
  description: 'Write a trivia question with three multiple-choice answers. One answer should be correct and fact-checked, and two answers should be incorrect.',
  fields: [{
    type: TaskFieldType.text,
    name: 'question',
    placeholder: 'Question',
    validation: ['isRequired'],
  },
  {
    type: TaskFieldType.text,
    name: 'correctAnswer',
    placeholder: 'Correct Answer',
    validation: ['isRequired'],
  },
  {
    type: TaskFieldType.text,
    name: 'incorrectAnswerA',
    placeholder: 'Incorrect Answer',
    validation: ['isRequired'],
  },
  {
    type: TaskFieldType.text,
    name: 'incorrectAnswerB',
    placeholder: 'Incorrect Answer',
    validation: ['isRequired'],
  }],
};
