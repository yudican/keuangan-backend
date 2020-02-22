const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'))

module.exports.transactionSchema = Joi.object().keys({
  category_id: Joi.string().required(),
  rekening_id: Joi.string().required(),
  jenis: Joi.string().required(),
  nominal: Joi.number().required(),
  tanggal: Joi.date().format('YYYY-MM-DD').options({ convert: true }).required(),
  keterangan: Joi.string()
})

module.exports.getRangeDate = Joi.object().keys({
  start: Joi.date().format('YYYY-MM-DD').options({ convert: true }),
  end: Joi.date().format('YYYY-MM-DD').options({ convert: true }),
  user_id: Joi.string()
})