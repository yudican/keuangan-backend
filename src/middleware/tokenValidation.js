const jwt = require('jsonwebtoken')
const constants = require('../helpers/constants')

module.exports = (req, res, next) => {
  let response = {...constants.defaultResponseMessage}
  try {
    const header = req.headers.authorization;
    if(!header){
      throw new Error(constants.requestValidation.MISSING_TOKEN)
    }
    const token = header.split('Bearer')[1].trim();
    const decode = jwt.verify(token, process.env.SECRET_KEY || 'X-API-KEY')
    return next()
  } catch (error) {
    response.message = error.message,
    response.status = 401
  }
  res.status(response.status).send(response)
}