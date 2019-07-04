/* eslint-env mocha */
import assert from 'assert';

import Auth from '../helpers/Auth';
import Passcode from '../helpers/Passcode';

const { createToken, verifyToken } = Auth;
const { encryptPassword, verifyPassword } = Passcode;

describe('Auth', () => {
  let token;
  let res;
  const payload = { id: 1, type: 'client' };
  describe('createToken()', () => {
    it('should create a token', () => {
      token = createToken(payload);
      assert.equal('string', typeof token);
    });
  });

  describe('verifyToken()', () => {
    it('should verify a token', () => {
      const result = verifyToken(res, token);
      const resultProps = Object.keys(result);
      const resultValues = Object.values(result);
      const payloadProps = Object.keys(payload);
      const payloadValues = Object.values(payload);
      const isEqualProps = payloadProps.every((prop) => {
        return resultProps.includes(prop);
      });
      const isEqualValues = payloadValues.every((value) => {
        return resultValues.includes(value);
      });
      assert.equal(true, isEqualProps);
      assert.equal(true, isEqualValues);
    });
  });
});

describe('Passcode', async () => {
  const password = 'unecryptedpassword';
  const hashedPassword = await encryptPassword(password);
  describe('encryptPassword()', () => {
    it('should create a hash', async () => {
      const hashRegex = /^\$2[ayb]\$.{56}$/;
      assert.equal(true, hashRegex.test(hashedPassword));
      assert.equal(60, hashedPassword.length);
    });
  });
  describe('verifyPassword()', () => {
    it('should verify password', async () => {
      const isVerified = await verifyPassword(password, hashedPassword);
      assert.equal(true, isVerified);
    });
  });
});
