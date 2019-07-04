import express from 'express';
import AgentPropertyController from '../controllers/AgentPropertyController';
import validate from '../middlewares/validate';
import Imagevalidator from '../middlewares/imageValidator';
import propertyValidator from '../middlewares/propertyValidator';
import uploader from '../config/multer';

const { upload } = uploader;
const uploaded = upload.single('image_url');
const router = express.Router();
const {
  createProperty,
} = AgentPropertyController;

const {
  propertyFieldsValidator,
  isAdvPurposeRent,
} = propertyValidator;

// for agents
router.post('/agent', uploaded, Imagevalidator, propertyFieldsValidator, isAdvPurposeRent, validate, createProperty);

export default router;