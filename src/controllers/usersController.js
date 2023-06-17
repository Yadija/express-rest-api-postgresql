class UsersController {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  async postUserController(req, res, next) {
    try {
      this._validator.validateUserPayload(req.body);
      const id = await this._service.addUser(req.body);

      res.status(201).json({
        status: 'success',
        data: {
          userId: id,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getUsersByIdController(req, res, next) {
    try {
      const { userId } = req.params;

      const user = await this._service.getUserById(userId);
      res.status(200).json({
        status: 'success',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default UsersController;
