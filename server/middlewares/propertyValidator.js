import { body, param } from 'express-validator/check';
import { sanitizeBody } from 'express-validator/filter';

const propertyValidator = {
  propertyFieldsValidator: [
    body('type')
      .trim()
      .exists({ checkFalsy: true })
      .isIn(['flat', 'mini-flat', 'duplex', 'self-contained', 'bungalow'])
      .withMessage('Invalid property type!'),
    body('state')
      .trim()
      .exists({ checkFalsy: true })
      .isString()
      .withMessage('State name is required and must be only alphabets!'),

    body('city')
      .trim()
      .exists({ checkFalsy: true })
      .isString()
      .withMessage('City name is required and must be only alphabets!'),

    body('address')
      .trim()
      .exists({ checkFalsy: true })
      .withMessage('Address is required!')
      .isString()
      .withMessage('must not be a string'),
    body('price')
      .trim()
      .exists({ checkFalsy: true })
      .isFloat()
      .withMessage('Please Check Input!'),
  ],
  statusValidator: [
    body('status')
      .trim()
      .exists({ checkNull: true, checkFalsy: true })
      .withMessage('Status is required!')
      .isString()
      .withMessage('Status is required!'),
    sanitizeBody('status').customSanitizer((value) => {
      const titleCaseValue = value.toUpperCase();
      return titleCaseValue;
    }),
  ],
  isAdvFraudulent: [
    body('reason')
      .trim()
      .exists({ checkFalsy: true })
      .withMessage('Your Reason is required!')
      .isIn(['pricing', 'wrongDoc', 'strangeDemands', 'illegalOwnership'])
      .withMessage('Invalid Reason!'),
    body('description')
      .trim()
      .exists({ checkFalsy: true })
      .withMessage('Explain your reason!')
      .isString()
      .withMessage('Must Be a String')
      .isLength({ min: 10 })
      .withMessage('Too short. give more details'),
  ],
  propertyIdParamValidator: [
    param('id')
      .trim()
      .isInt()
      .withMessage('Invalid property Id.')
      .matches(/[0-9]+$/)
      .withMessage('Invalid Id.'),
  ],
};

export default propertyValidator;
