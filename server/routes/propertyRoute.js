import express from 'express';
import AgentPropertyController from '../controllers/AgentPropertyController';
import UserPropertyController from '../controllers/UserPropertyController';
import validate from '../middlewares/validate';
import Imagevalidator from '../middlewares/imageValidator';
import propertyValidator from '../middlewares/propertyValidator';
import uploader from '../config/multer';

const { upload } = uploader;
const uploaded = upload.single('image_url');
const router = express.Router();
const {
  createProperty,
  UpdateProperty,
  MarkSoldProperty,
  DeleteProperty,
  GetMyProperties,
} = AgentPropertyController;

const {
  GetAllProperties,
  GetProperty,
  MarkPropAsFraud,
} = UserPropertyController;

const {
  propertyFieldsValidator,
  isAdvPurposeRent,
} = propertyValidator;

// for agents
router.get('/agent', GetMyProperties);
router.post('/agent', uploaded, Imagevalidator, propertyFieldsValidator, isAdvPurposeRent, validate, createProperty);
router.patch('/agent/:id', UpdateProperty);
router.patch('/agent/:id/sold', MarkSoldProperty);
router.delete('/agent/:id', DeleteProperty);

// for user
router.get('/', GetAllProperties);
router.get('/:id', GetProperty);
router.patch('/:id/fraud', MarkPropAsFraud);


export default router;
