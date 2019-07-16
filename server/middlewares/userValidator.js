
import { body, check } from 'express-validator/check';
import { sanitizeBody } from 'express-validator/filter';

const userValidator = {
  tokenValidator: [
    body('token')
      .trim()
      .exists({ checkFalsy: true })
      .withMessage('Token is required.')
      .matches(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)
      .withMessage('Invalid token.'),
  ],
  passwordValidator: [
    body('password')
      .trim()
      .exists({ checkFalsy: true })
      .withMessage('Password is required.')
      .isString()
      .withMessage('Must be a string'),
  ],
  emailValidator: [
    check('email')
      .trim()
      .exists({ checkFalsy: true })
      .withMessage('Email is required.')
      .isEmail()
      .normalizeEmail()
      .withMessage('Invalid email address.'),
  ],
  nameValidator: [
    body('first_name')
      .trim()
      .exists({ checkFalsy: true })
      .withMessage('First name is required.')
      .isString()
      .withMessage('Invalid first name.'),
    sanitizeBody('first_name').customSanitizer((value) => {
      const titleCaseValue = value.toUpperCase();
      return titleCaseValue;
    }),
    body('last_name')
      .trim()
      .exists({ checkFalsy: true })
      .withMessage('Last name is required.')
      .isString()
      .withMessage('Invalid last name.'),
    sanitizeBody('last_name').customSanitizer((value) => {
      const titleCaseValue = value.toUpperCase();
      return titleCaseValue;
    }),
  ],
  phoneNumberValidator: [
    body('phone_number')
      .trim()
      .exists({ checkFalsy: true })
      .withMessage('Phone number is required!')
      .isString()
      .withMessage('Invalid Phone Number.')
  ],
  addressValidator: [
    body('address')
      .trim()
      .exists({ checkFalsy: true })
      .withMessage('Address is required!')
      .isString()
      .withMessage('Invalid Phone Number.'),
  ],
  typeValidator: [
    body('type')
      .trim()
      .exists({ checkFalsy: true })
      .withMessage('User Type is required!')
      .isString()
      .withMessage('Wrong user type!'),
  ],
  isAdminValidator: [
    body('is_admin')
      .trim()
      .exists()
      .withMessage('Is Admin is required!')
      .isBoolean()
      .withMessage('Wrong Data type!'),
  ],
};

export default userValidator;
