import {
  validateLength,
  validateFormat,
} from 'ember-changeset-validations/validators';

export default {
  username: validateLength({
    min: 4,
    message: 'Username should have min 4 letters',
  }),

  email: validateFormat({
    type: 'email',
    message: 'Mail format: example@example.com',
  }),

  password: [
    validateLength({
      min: 8,
      message: 'Username should have min 8 letters',
    }),
    validateFormat({
      regex:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      message:
        'Password length>8 and should contain one capital letter, number and special char',
    }),
  ],

  photoURL: validateFormat({ type: 'url' }),
};
