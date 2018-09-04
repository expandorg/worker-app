// @flow
import { rules } from '@gemsorg/components/src/common/validation';

export const loginValidation = {
  email: [
    [rules.isNotEmpty, 'Email can not be empty'],
    [rules.isEmail, 'Incorrect email format'],
  ],
  password: [[rules.isNotEmpty, 'Password can not be empty']],
};

export const signupValidation = {
  email: [
    [rules.isNotEmpty, 'Email can not be empty'],
    [rules.isEmail, 'Incorrect email format'],
  ],
  password: [[rules.isNotEmpty, 'Password can not be empty']],
};
