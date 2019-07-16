import express from 'express';
import AgentPropertyController from '../controllers/AgentPropertyController';
import UserPropertyController from '../controllers/UserPropertyController';
// import validate from '../middlewares/validate';
// import Imagevalidator from '../middlewares/imageValidator';
// import propertyValidator from '../middlewares/propertyValidator';
import Authenticator from '../middlewares/Authenticator';
// import uploader from '../config/multer';

const router = express.Router();
// const { upload } = uploader;
// const uploaded = upload.single('image_url');
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

// for agents
router.post('/', isLoggedIn, createProperty);
router.patch('/:id', isLoggedIn, UpdateProperty);
router.patch('/:id/sold', isLoggedIn, MarkSoldProperty);
router.delete('/:id', isLoggedIn, DeleteProperty);

// for user
router.get('/', isLoggedIn, GetAllProperties);
router.get('/:id', isLoggedIn, GetProperty);
router.patch('/:id/fraud', isLoggedIn, MarkPropAsFraud);


export default router;
