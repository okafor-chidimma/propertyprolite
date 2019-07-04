import { body } from 'express-validator/check';

const propertyValidator = {
  propertyFieldsValidator: [
    body('no_of_rooms')
      .exists({ checkFalsy: true })
      .withMessage('Number of Rooms is required!')
      .isNumeric()
      .withMessage('Number of rooms must be a number!')
      .trim(),
    body('type')
      .exists({ checkFalsy: true })
      .withMessage('Property type is required!')
      .isIn(['flat', 'mini-flat', 'duplex', 'self-contained', 'bungalow'])
      .withMessage('Invalid property type!')
      .trim(),
    body('country')
      .exists({ checkFalsy: true })
      .withMessage('Country is required!')
      .isString()
      .withMessage('Country name must be alphabets!')
      .trim(),
    body('state')
      .exists({ checkFalsy: true })
      .withMessage('State is required!')
      .isString()
      .withMessage('State name must be only alphabets!')
      .trim(),
    body('city')
      .exists({ checkFalsy: true })
      .withMessage('City is required!')
      .isString()
      .withMessage('City name must be only alphabets!')
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
      .withMessage('Price Value is required!')
      .isFloat()
      .withMessage('Invalid price value!')
      .trim(),
    body('adv_desc')
      .exists({ checkFalsy: true })
      .withMessage('Advert Description is required!')
      .isString()
      .withMessage('Advert Must contain only string')
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
      .withMessage('Status is required!')
      .isString()
      .withMessage('Must Be A String!')
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
      .withMessage('Your Location is required!')
      .isString()
      .withMessage('Must Be a String')
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
