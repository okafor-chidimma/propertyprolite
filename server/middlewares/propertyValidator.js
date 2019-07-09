import { body } from 'express-validator/check';

const propertyValidator = {
  propertyFieldsValidator: [
    body('no_of_rooms')
      .exists({ checkFalsy: true })
      .isNumeric()
      .withMessage('Number of rooms is required and must be a number!')
      .trim(),
    body('type')
      .exists({ checkFalsy: true })
      .isIn(['flat', 'mini-flat', 'duplex', 'self-contained', 'bungalow'])
      .withMessage('Invalid property type!')
      .trim(),
    body('country')
      .exists({ checkFalsy: true })
      .isString()
      .withMessage('Country is required and must be alphabets!')
      .trim(),
    body('state')
      .exists({ checkFalsy: true })
      .isString()
      .withMessage('State name is required and must be only alphabets!')
      .trim(),
    body('city')
      .exists({ checkFalsy: true })
      .isString()
      .withMessage('City name is required and must be only alphabets!')
      .trim(),
    body('address')
      .exists({ checkFalsy: true })
      .withMessage('Address is required!')
      .isString()
      .matches(/\d/)
      .withMessage('must be alphanumeric')
      .isLength({ max: 40 })
      .withMessage('must not be more than 40 characters')
      .trim(),
    body('price')
      .exists({ checkFalsy: true })
      .isFloat()
      .withMessage('Please Check Input!')
      .trim(),
    body('adv_desc')
      .exists({ checkFalsy: true })
      .isString()
      .withMessage('Advert Description is required!')
      .trim(),
    body('adv_purpose')
      .exists({ checkFalsy: true })
      .withMessage('Advert Purpose is required!')
      .isIn(['rent', 'sale'])
      .withMessage('Invalid Advert Purpose')
      .trim(),
    body('fraud')
      .exists()
      .withMessage('Fraud is required!')
      .isBoolean()
      .withMessage('Must be Either True or False!')
      .trim(),
    body('status')
      .exists({ checkFalsy: true })
      .isString()
      .withMessage('Status is required!')
      .trim(),
  ],
  isAdvPurposeRent: [
    body('duration')
      .custom((duration, { req }) => {
        let rentStatus = true;
        if ((req.body.adv_purpose === 'rent') && (duration === '')) {
          rentStatus = false;
        }
        return rentStatus;
      })
      .withMessage('Duration Field is Required!')
      .isString()
      .withMessage('Advert Must contain only string')
      .trim(),
  ],
  isAdvFraudulent: [
    body('location')
      .exists({ checkFalsy: true })
      .isString()
      .withMessage('Your Location is required!')
      .trim(),
    body('reason')
      .exists({ checkFalsy: true })
      .withMessage('Your Reason is required!')
      .isIn(['pricing', 'wrongDoc', 'strangeDemands', 'illegalOwnership'])
      .withMessage('Invalid Reason!')
      .trim(),
    body('fraud_desc')
      .exists({ checkFalsy: true })
      .withMessage('Explain your reason!')
      .isString()
      .withMessage('Must Be a String')
      .isLength({ min: 10 })
      .withMessage('Too short. give more details')
      .trim(),
  ],
};

export default propertyValidator;
