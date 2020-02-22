const Joi = require('@hapi/joi')

module.exports.userCreate = Joi.object().keys({
  name: Joi.string().required(),
  username: Joi.string().required().min(6),
  email: Joi.string().required(),
  password: Joi.string().required().min(6)
})

module.exports.userLogin = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required().min(6)
})

module.exports.userUpdate = Joi.object().keys({
  name: Joi.string().required(),
  username: Joi.string().required().min(6),
  email: Joi.string().required(),
  password: Joi.string(),
})

