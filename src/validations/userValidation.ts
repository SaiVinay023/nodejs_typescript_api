import Joi from 'joi';

export function validateUser(user: any) {
  const schema = Joi.object({
    name: Joi.string().required(),
    surname: Joi.string().required(),
    birth_date: Joi.date().required(),
    sex: Joi.string().valid('male', 'female', 'other').required()
  });

  return schema.validate(user);
}
