import jwt from 'jsonwebtoken';

// exceptions
import AuthenticationError from '../exceptions/AuthenticationError.js';

const authenticationMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.get('Authorization');

    if (!authHeader) throw new AuthenticationError('unauthorized');

    const accessToken = authHeader.split(' ')[1];
    const { id } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY);

    req.credentialId = id;
    next();
  } catch (error) {
    next(error);
  }
};

export default authenticationMiddleware;
