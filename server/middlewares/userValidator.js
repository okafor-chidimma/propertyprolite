import { body } from 'express-validator/check';
import UserModel from '../models/userModel';

const allUsers = UserModel;

const userValidator = {
  signupValidator: [
    body('first_name')
      .exists({ checkFalsy: true })
      .withMessage('Firstname is required!')
      .trim(),
    body('last_name')
      .exists({ checkFalsy: true })
      .withMessage('Lastname is required!')
      .trim(),
    body('email')
      .exists({ checkFalsy: true })
      .withMessage('Email is required!')
      .isEmail()
      .withMessage('Invalid email address!')
      .trim(),
    body('password')
      .exists({ checkFalsy: true })
      .withMessage('Password is required!')
      .isString()
      .withMessage('Password must be string!')
      .trim(),
    body('phoneNumber')
      .exists({ checkFalsy: true })
      .withMessage('Phone number is required!')
      .isString()
      .trim(),
    body('address')
      .exists({ checkFalsy: true })
      .withMessage('Address is required!')
      .isString()
      .trim(),
    body('type')
      .exists({ checkFalsy: true })
      .withMessage('User Type is required!')
      .isIn(['admin', 'agent', 'user'])
      .withMessage('Wrong user type!')
      .trim(),
    body('is_admin')
      .exists()
      .withMessage('Is Admin is required!')
      .isBoolean()
      .withMessage('Wrong Data type!')
      .trim(),
  ],
  duplicateValidator: [
    body('email')
      .custom((email) => {
        const isNotDuplicate = allUsers.find((user) => { return user.email === email; });
        return !isNotDuplicate;
      })
      .withMessage('This email is already in use, Try another one!'),
  ],
};


export default userValidator;
