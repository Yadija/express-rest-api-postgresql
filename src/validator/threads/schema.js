import Joi from 'joi';

const ThreadPayloadSchema = Joi.object({
  content: Joi.string().required(),
});

export { ThreadPayloadSchema };
