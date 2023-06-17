import express from 'express';

// controllers
import AuthenticationsController from '../controllers/authenticationsController.js';

// services
import AuthenticationsService from '../services/authenticationsService.js';
import UsersService from '../services/usersService.js';

// validator
import AuthenticationsValidator from '../validator/authentications/index.js';

// token
import tokenManager from '../tokenize/tokenManager.js';

const authenticationsService = new AuthenticationsService();
const usersService = new UsersService();
const authenticationsController = new AuthenticationsController(
  authenticationsService,
  usersService,
  tokenManager,
  AuthenticationsValidator,
);

const authenticationRouter = express.Router();
authenticationRouter.post('/authentications', (req, res, next) => authenticationsController.postAuthenticationController(req, res, next));
authenticationRouter.put('/authentications', (req, res, next) => authenticationsController.putAuthenticationController(req, res, next));
authenticationRouter.delete('/authentications', (req, res, next) => authenticationsController.deleteAuthenticationController(req, res, next));

export default authenticationRouter;
