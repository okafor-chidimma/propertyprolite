import express from 'express';

import UserController from '../controllers/UserController';
import validate from '../middlewares/validate';
import userValidator from '../middlewares/userValidator';

const router = express.Router();
const { signUp, signIn } = UserController;
const {
  signupValidator,
  signinValidator,
  duplicateValidator,
  mismatchCredentials,
} = userValidator;

router.post('/signup', signupValidator, duplicateValidator, validate, signUp);
router.post('/signin', signinValidator, mismatchCredentials, validate, signIn);


export default router;
