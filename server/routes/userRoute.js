import express from 'express';

import UserController from '../controllers/UserController';
import validate from '../middlewares/validate';
import userValidator from '../middlewares/userValidator';

const router = express.Router();
const { signUp } = UserController;
const {
  signupValidator,
  duplicateValidator,
} = userValidator;

router.post('/signup', signupValidator, duplicateValidator, validate, signUp);

export default router;
