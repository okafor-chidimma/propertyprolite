import express from 'express';
import AgentPropertyController from '../controllers/AgentPropertyController';
import UserPropertyController from '../controllers/UserPropertyController';
import validate from '../middlewares/validate';
import Imagevalidator from '../middlewares/imageValidator';
import propertyValidator from '../middlewares/propertyValidator';
import Authenticator from '../middlewares/Authenticator';
import uploader from '../config/multer';

const router = express.Router();
const { upload } = uploader;
const uploaded = upload.single('image_url');
const { isLoggedIn } = Authenticator;
const {
  createProperty,
  UpdateProperty,
  MarkSoldProperty,
  DeleteProperty,
} = AgentPropertyController;

const {
  GetAllProperties,
  GetProperty,
  MarkPropAsFraud,
} = UserPropertyController;

const {
  propertyFieldsValidator,

  isAdvFraudulent,
  propertyIdParamValidator,
} = propertyValidator;

// for agents
router.post('/', isLoggedIn, uploaded,
  Imagevalidator, propertyFieldsValidator,
  validate, createProperty);
router.patch('/:id', isLoggedIn,
  propertyIdParamValidator, UpdateProperty);
router.patch('/:id/sold', isLoggedIn,
  propertyIdParamValidator, validate, MarkSoldProperty);
router.delete('/:id', isLoggedIn,
  propertyIdParamValidator, validate, DeleteProperty);

// for user
router.get('/', isLoggedIn, GetAllProperties);
router.get('/:id', isLoggedIn, propertyIdParamValidator, validate, GetProperty);
router.patch('/:id/fraud', isLoggedIn, propertyIdParamValidator,
  isAdvFraudulent, validate, MarkPropAsFraud);


export default router;
