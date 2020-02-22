const Joi = require('@hapi/joi')

module.exports.rekeningSchema = Joi.object().keys({
  nama_rekening: Joi.string().required(),
  nomor_rekening: Joi.number().required(),
  user_id: Joi.string().required()
})