import users from '../models/userModel';
/* eslint-disable camelcase */
import auth from '../helpers/Auth';
import Passcode from '../helpers/Passcode';
import pool from '../database/db';
import authUserQueries from '../database/queries/authUser';
import Response from '../helpers/Response';

const {
  checkEmail, insertUserQuery,
} = authUserQueries;

const { successResponse, errorResponse } = Response;

const { createToken } = auth;
const { encryptPassword } = Passcode;
let msg;
const allUsers = users;


class UserController {
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
        msg = `Email already in Use!`;
        return res.status(409).json(errorResponse(msg));
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
        msg = `Account successfully created.`;
        return res.status(201).json(successResponse(msg, newSignup));
      }
    } catch (error) {
      msg = `Internal server error, could not create account at this time!`;
      return res.status(500).json(errorResponse(msg));
    } finally {
      await client.release();
    }
  }
  // for signin

  static async signIn(req, res) {
    const { email } = req.body;
    const singleUser = allUsers.find((user) => {
      return user.email === email;
    });
    const { id, type } = singleUser;
    const token = createToken({ id, type });
    const newSignin = { token, singleUser };
    return res.header('x-auth-token', token).status(200).json({
      status: 'success',
      data: newSignin,
    });
  }
}

export default UserController;
