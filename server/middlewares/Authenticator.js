/* eslint-disable camelcase */
import Auth from '../helpers/Auth';
import Response from '../helpers/Response';

const { verifyToken } = Auth;
const { errorResponse } = Response;

class Authenticator {
  static async isLoggedIn(req, res, next) {
    const msg = `Access denied.Unauthorized request. Please Log In`;
    try {
      const requestToken = req.headers['x-auth-token'];
      if (!requestToken) {
        return res.status(401).json(errorResponse(msg));
      }
      const verifiedToken = await verifyToken(requestToken);
      if (!verifiedToken) {
        return res.status(401).json(errorResponse(msg));
      }
      req.headers['x-auth-token'] = verifiedToken;
      return next();
    } catch (error) {
      return res.status(401).json(errorResponse(msg));
    }
  }

  static async isAgent(req, res, next) {
    const verifiedToken = req.headers['x-auth-token'];
    const { user_type } = verifiedToken;
    const val = user_type === 'agent';
    if (!val) {
      return res.status(403).json(errorResponse(`Forbidden. Only an Agent can perform this action.`));
    }
    req.headers['x-auth-token'] = verifiedToken;
    return next();
  }
}

export default Authenticator;
