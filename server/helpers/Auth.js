import jwt from 'jsonwebtoken';
import '../config/config';

const secretKey = process.env.SECRET_KEY;

class auth {
  static createToken(payload) {
    return jwt.sign(payload, secretKey);
  }

  static verifyToken(token) {
    return jwt.verify(token, secretKey);
  }
}

export default auth;
