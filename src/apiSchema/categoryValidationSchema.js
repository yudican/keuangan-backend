const Joi = require('@hapi/joi')

module.exports.categoriesSchema = Joi.object().keys({
  type: Joi.string().required(),
  name: Joi.string().required()
})