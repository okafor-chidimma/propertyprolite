import express from 'express';
import UserController from '../controllers/UserController';
import validate from '../middlewares/validate';
import userValidator from '../middlewares/userValidator';

const router = express.Router();
const { signUp, signIn, validateToken } = UserController;
const {
  emailValidator,
  passwordValidator,
  nameValidator,
  phoneNumberValidator,
  addressValidator,
  typeValidator,
  isAdminValidator,
  tokenValidator,
} = userValidator;

router.post('/signup',
  emailValidator, passwordValidator, nameValidator, phoneNumberValidator,
  addressValidator, typeValidator, isAdminValidator, validate, signUp);
router.post('/signin', emailValidator, passwordValidator, validate, signIn);

router.post('/validate/token', tokenValidator, validate, validateToken);


export default router;
