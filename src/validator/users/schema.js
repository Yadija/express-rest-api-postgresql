import Joi from 'joi';

const UserPayloadSchema = Joi.object({
  username: Joi.string().required().custom((value, helpers) => {
    if (/\s/.test(value)) {
      return helpers.message('username contain forbiden character');
    }

    return value;
  }),
  password: Joi.string().required(),
  fullname: Joi.string().required(),
});

export { UserPayloadSchema };
