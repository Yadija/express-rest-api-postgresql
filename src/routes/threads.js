import express from 'express';

// controllers
import ThreadsController from '../controllers/threadsController.js';

// services
import ThreadsService from '../services/threadsService.js';

// validator
import ThreadsValidator from '../validator/threads/index.js';

// middleware
import authenticationMiddleware from '../middleware/authenticationMiddleware.js';

const threadsService = new ThreadsService();
const threadsController = new ThreadsController(threadsService, ThreadsValidator);

const threadRouter = express.Router();

threadRouter.get('/threads', (req, res, next) => threadsController.getThreadsController(req, res, next));
threadRouter.get('/threads/:threadId', (req, res, next) => threadsController.getThreadByIdController(req, res, next));

threadRouter.use(authenticationMiddleware);

threadRouter.post('/threads', (req, res, next) => threadsController.postThreadController(req, res, next));
threadRouter.put('/threads/:threadId', (req, res, next) => threadsController.putThreadByIdController(req, res, next));
threadRouter.delete('/threads/:threadId', (req, res, next) => threadsController.deleteThreadByIdController(req, res, next));

export default threadRouter;
