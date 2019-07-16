import express from 'express';
import UserController from '../controllers/UserController';
import validate from '../middlewares/validate';
import userValidator from '../middlewares/userValidator';

const router = express.Router();
const {
  signUp, signIn, validateToken, showApiVersioning
} = UserController;
const {
  tokenValidator,
} = userValidator;

router.post('/signup', signUp);
router.post('/signin', signIn);

router.post('/validate/token', tokenValidator, validate, validateToken);
router.get('/', showApiVersioning);

export default router;
