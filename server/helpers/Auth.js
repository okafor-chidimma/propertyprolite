import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secretKey = process.env.SECRET_KEY;

class auth {
  // generate token and verify token
  static createToken(payload) {
    return jwt.sign(payload, secretKey);
  }

  static verifyToken(responseServer, token) {
    let authorizedData;
    try {
      authorizedData = jwt.verify(token, secretKey);
    } catch (error) {
      return responseServer.status(403).json({
        status: 'error',
        error: 'Invalid Token',
      });
    }
    return authorizedData;
  }
}

export default auth;
