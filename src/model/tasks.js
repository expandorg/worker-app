// @flow
import { FieldType } from './enums';
import { rules, ruleMessages } from '../common/validation';


export class FormBuilder {
  static getDefaultValue = (type: string) => {
    switch (type) {
      case FieldType.text:
        return '';
      case FieldType.checkbox:
        return false;
      case FieldType.modal:
        return false;
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

export const formBuilder = new FormBuilder();
