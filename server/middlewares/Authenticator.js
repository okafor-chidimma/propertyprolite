/* eslint-disable camelcase */
import Auth from '../helpers/Auth';
import Response from '../helpers/Response';

const { verifyToken } = Auth;
const { errorResponse } = Response;

class Authenticator {
  static async isLoggedIn(req, res, next) {
    let msg;
    try {
      const requestToken = req.headers['x-auth-token'];
      console.log(requestToken, 'inside try request from test');
      if (!requestToken) {
        msg = `Access denied.Unauthorized request. Please Log In`;
        return res.status(401).json(errorResponse(msg));
      }
      const verifiedToken = await verifyToken(requestToken);
      console.log(verifiedToken, 'verify');
      if (!verifiedToken) {
        msg = `Access denied.Unauthorized request. Please Log In`;
        return res.status(401).json(errorResponse(msg));
      }
      req.headers['x-auth-token'] = verifiedToken;
      return next();
    } catch (error) {
      console.log(error, 'error');
      msg = `Access denied.Unauthorized request. Please Log In`;
      return res.status(401).json(errorResponse(msg));
    }
  }

  static async isAgent(req, res, next) {
    let msg;
    const verifiedToken = req.headers['x-auth-token'];
    const { user_type } = verifiedToken;
    const val = user_type === 'agent';
    if (!val) {
      msg = `Forbidden. Only an Agent can perform this action.`;
      return res.status(403).json(errorResponse(msg));
    }
    req.headers['x-auth-token'] = verifiedToken;
    return next();
  }
}

export default Authenticator;
