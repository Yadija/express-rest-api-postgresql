import jwt from 'jsonwebtoken';

// exceptions
import InvariantError from '../../../express-rest-api/src/exceptions/InvariantError.js';

const tokenManager = {
  generateAccessToken: (payload) => jwt.sign(
    payload,
    process.env.ACCESS_TOKEN_KEY,
    { expiresIn: process.env.ACCESS_TOKEN_AGE },
  ),
  generateRefreshToken: (payload) => jwt.sign(
    payload,
    process.env.REFRESH_TOKEN_KEY,
    { expiresIn: process.env.ACCESS_TOKEN_AGE },
  ),
  verifyRefreshToken: (refreshToken) => {
    try {
      const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);

      return payload;
    } catch (error) {
      throw new InvariantError('invalid refresh token');
    }
  },
};

export default tokenManager;
