class AuthenticationsController {
  constructor(authenticationsService, usersService, tokenManager, validator) {
    this._authenticationsService = authenticationsService;
    this._usersService = usersService;
    this._tokenManager = tokenManager;
    this._validator = validator;
  }

  async postAuthenticationController(req, res, next) {
    try {
      this._validator.validatePostAuthenticationPayload(req.body);

      const { username, password } = req.body;
      const id = await this._usersService.verifyUserCredential(username, password);

      const accessToken = this._tokenManager.generateAccessToken({ id });
      const refreshToken = this._tokenManager.generateRefreshToken({ id });

      await this._authenticationsService.addRefreshToken(refreshToken);

      res.status(201).json({
        status: 'success',
        data: {
          accessToken,
          refreshToken,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async putAuthenticationController(req, res, next) {
    try {
      this._validator.validatePutAuthenticationPayload(req.body);

      const { refreshToken } = req.body;
      await this._authenticationsService.verifyRefreshToken(refreshToken);

      const { id } = this._tokenManager.verifyRefreshToken(refreshToken);
      const accessToken = this._tokenManager.generateAccessToken({ id });

      res.status(200).json({
        status: 'success',
        data: {
          accessToken,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteAuthenticationController(req, res, next) {
    try {
      this._validator.validateDeleteAuthenticationPayload(req.body);

      const { refreshToken } = req.body;

      await this._authenticationsService.verifyRefreshToken(refreshToken);
      await this._authenticationsService.deleteRefreshToken(refreshToken);

      res.status(200).json({
        status: 'success',
        message: 'refresh token deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}

export default AuthenticationsController;
