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
const { isLoggedIn, isAgent } = Authenticator;
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
  statusValidator,

  isAdvFraudulent,
  propertyIdParamValidator,
} = propertyValidator;

// for agents
router.post('/', isLoggedIn, isAgent, uploaded,
  Imagevalidator, propertyFieldsValidator, statusValidator,
  validate, createProperty);
router.patch('/:id', isLoggedIn, isAgent,
  propertyIdParamValidator, uploaded, Imagevalidator,
  propertyFieldsValidator, statusValidator,
  validate, UpdateProperty);
router.patch('/:id/sold', isLoggedIn, isAgent,
  propertyIdParamValidator, statusValidator, validate, MarkSoldProperty);
router.delete('/:id', isLoggedIn, isAgent,
  propertyIdParamValidator, validate, DeleteProperty);

// for user
router.get('/', isLoggedIn, GetAllProperties);
router.get('/:id', isLoggedIn, propertyIdParamValidator, validate, GetProperty);
router.patch('/:id/fraud', isLoggedIn, propertyIdParamValidator,
  isAdvFraudulent, validate, MarkPropAsFraud);


export default router;
