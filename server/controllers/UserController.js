/* eslint-disable camelcase */
import auth from '../helpers/Auth';
import Passcode from '../helpers/Passcode';
import pool from '../database/db';
import authUserQueries from '../database/queries/authUser';
import Response from '../helpers/Response';

const { checkEmail, insertUserQuery, signIn } = authUserQueries;

const { successResponse, messageResponse, errorResponse } = Response;

const { createToken, verifyToken } = auth;

const { encryptPassword, verifyPassword } = Passcode;

let msg;

class UserController {
  /**
   * @description Creates a new user account
   * @static
   * @async
   *
   * @param {object} req - create new user request object
   * @param {object} res - create new user response object
   *
   * @returns
   * @memberof UserController
   */
  static async signUp(req, res) {
    const client = await pool.connect();
    try {
      const {
        first_name: first_name_input, last_name: last_name_input,
        address: address_input, email: email_input,
        password: user_password, type: user_role,
        is_admin: admin_input, phone_number: phone_input,
      } = req.body;
      const checkValue = [email_input];
      const { rows: checkExistingRows } = await client.query(checkEmail, checkValue);
      if (checkExistingRows[0]) {
        return res.status(409).json(errorResponse(`Email already in Use!`));
      }
      const secure_password = await encryptPassword(user_password);
      const values = [
        first_name_input, last_name_input, address_input,
        email_input, secure_password, user_role,
        admin_input, phone_input,
      ];
      const { rows } = await client.query(insertUserQuery, values);
      if (rows[0]) {
        const { id: user_id, type: user_type } = rows[0];
        const token = createToken({ user_id, user_type });
        const signupDet = rows[0];
        const signupDetails = { ...signupDet, user_password };
        const newSignup = { token, ...signupDetails };
        return res.status(201).json(successResponse(`Account successfully created.`, newSignup));
      }
    } catch (error) {
      console.log(error, 'createuser');
      return res.status(500).json(errorResponse(`Internal server error, could not create account at this time!`));
    } finally {
      await client.release();
    }
  }
  // for signin

  static async signIn(req, res) {
    const client = await pool.connect();
    try {
      msg = `Email or password incorrect!`;
      const { email: email_input, password: password_input } = req.body;
      const values = [email_input];
      const { rows } = await client.query(signIn, values);
      if (!rows[0]) {
        return res.status(400).json(errorResponse(msg));
      }
      const {
        id: user_id, password: user_password, type: user_type,
      } = rows[0];
      const isVerified = await verifyPassword(password_input, user_password);
      if (!isVerified) {
        return res.status(400).json(errorResponse(msg));
      }
      const token = createToken({ user_id, user_type });
      const { password, ...signinDetails } = rows[0];
      const newSignin = { token, ...signinDetails };
      return res.status(200).json(successResponse(`User successfully logged in.`, newSignin));
    } catch (error) {
      return res.status(500).json(errorResponse(`Internal server error!`));
    } finally {
      await client.release();
    }
  }

  static async validateToken(req, res) {
    try {
      msg = 'Access denied. Invalid user token.';
      const { token } = req.body;
      const validToken = await verifyToken(token);
      if (!validToken) {
        return res.status(401).json(errorResponse(msg));
      }
      return res.status(200).json(messageResponse('Token validation successful.'));
    } catch (error) {
      const { name, message } = error;
      if (name === 'JsonWebTokenError' && message === 'invalid signature') {
        return res.status(401).json(errorResponse(msg));
      }
      return res.status(500)
        .json(errorResponse('Internal server error!'));
    }
  }
}

export default UserController;
