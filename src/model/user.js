import { rules } from '../common/validation';

export const loginValidation = {
  email: [
    [rules.isNotEmpty, 'Email can not be empty'],
  ],
  password: [
    [rules.isNotEmpty, 'Password can not be empty'],
  ],
};

export const signupValidation = {
  email: [
    [rules.isNotEmpty, 'Email can not be empty'],
  ],
  password: [
    [rules.isNotEmpty, 'Password can not be empty'],
  ],
};
