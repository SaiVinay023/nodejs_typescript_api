import Joi from 'joi';

export function validateUser(user: any) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    surname: Joi.string().min(2).max(100).required(),
    birth_date: Joi.date().required(),
    sex: Joi.string().valid('male', 'female', 'other').required()
  });

  return schema.validate(user);
}