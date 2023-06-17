class ThreadsController {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  async postThreadController(req, res, next) {
    try {
      this._validator.validateThreadPayload(req.body);

      const { content } = req.body;
      const { credentialId: owner } = req;

      const id = await this._service.addthread(content, owner);

      res.status(201).json({
        status: 'success',
        data: {
          threadId: id,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getThreadsController(req, res, next) {
    try {
      const threads = await this._service.getAllThreads();

      res.status(200).json({
        status: 'success',
        data: {
          threads,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getThreadByIdController(req, res, next) {
    try {
      const { threadId } = req.params;
      const thread = await this._service.getThreadById(threadId);

      res.status(200).json({
        status: 'success',
        data: {
          thread,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async putThreadByIdController(req, res, next) {
    try {
      this._validator.validateThreadPayload(req.body);

      const { threadId } = req.params;
      const { content } = req.body;
      const { credentialId: owner } = req;

      await this._service.verifyThreadOwner(threadId, owner);
      await this._service.editThreadById(threadId, content);

      res.status(200).json({
        status: 'success',
        message: 'thread updated successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteThreadByIdController(req, res, next) {
    try {
      const { threadId } = req.params;
      const { credentialId: owner } = req;

      await this._service.verifyThreadOwner(threadId, owner);
      await this._service.deleteThreadById(threadId);

      res.status(200).json({
        status: 'success',
        message: 'thread deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}

export default ThreadsController;
