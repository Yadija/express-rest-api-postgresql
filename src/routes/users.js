import express from 'express';

// controllers
import UsersController from '../controllers/usersController.js';

// services
import UsersService from '../services/usersService.js';

// validator
import UsersValidator from '../validator/users/index.js';

const usersService = new UsersService();
const usersController = new UsersController(usersService, UsersValidator);

const userRouter = express.Router();
userRouter.post('/users', (req, res, next) => usersController.postUserController(req, res, next));
userRouter.get('/users/:userId', (req, res, next) => usersController.getUsersByIdController(req, res, next));

export default userRouter;
