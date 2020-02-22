const Joi = require('@hapi/joi')
const constants = require('../helpers/constants')

const validateObject = (data, schema) => {
  const results = schema.validate(data, { convert: false })
  if(results.error){
    const errorDetails = results.error.details.map(value => {
      return {
        error: value.message,
        path: value.path
      }
    })
    return errorDetails;
  }
  return null;
}

module.exports.validateBody = (schema) => {
  return (req, res, next) => {
    let response = {...constants.defaultResponseMessage}
    const error = validateObject(req.body, schema)
    if(error){
      response.body = error
      response.message = constants.requestValidation.BAD_REQUEST
      return res.status(response.status).send(response)
    }
    return next()
  }
}

module.exports.validateParams = (schema) => {
  return (req, res, next) => {
    let response = {...constants.defaultResponseMessage}
    const error = validateObject(req.query, schema)
    if(error){
      response.body = error
      response.message = constants.requestValidation.BAD_REQUEST
      return res.status(response.status).send(response)
    }
    return next()
  }
}
