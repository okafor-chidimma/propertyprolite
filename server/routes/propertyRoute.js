import express from 'express';
import AgentPropertyController from '../controllers/AgentPropertyController';
import UserPropertyController from '../controllers/UserPropertyController';
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

// for agents
router.post('/', isLoggedIn, isAgent, uploaded, createProperty);
router.patch('/:id', isLoggedIn, isAgent, UpdateProperty);
router.patch('/:id/sold', isLoggedIn, isAgent, MarkSoldProperty);
router.delete('/:id', isLoggedIn, isAgent, DeleteProperty);

// // for user
router.get('/', isLoggedIn, GetAllProperties);
router.get('/:id', isLoggedIn, GetProperty);
router.patch('/:id/fraud', isLoggedIn, MarkPropAsFraud);


export default router;
