const rekeningService = require('../services/rekeningService');
const constants = require('../helpers/constants');


module.exports.getRekening = async (req,res) => {
  let response = {...constants.defaultResponseMessage}
  try {
    const responseFromService = await rekeningService.getRekening()
    response.status = 200
    response.message = constants.rekeningMessage.REKENING_FETCHED
    response.body = responseFromService
  } catch (error) {
    response.message = error.message
  }

  return res.status(response.status).send(response)
}
module.exports.getRekeningDetail = async (req,res) => {
  let response = {...constants.defaultResponseMessage}
  try {
    const responseFromService = await rekeningService.getRekeningDetail(req.query)
    response.status = 200
    response.message = constants.rekeningMessage.REKENING_FETCHED
    response.body = responseFromService
  } catch (error) {
    response.message = error.message
  }

  return res.status(response.status).send(response)
}

module.exports.getRekeningByid = async (req,res) => {
  let response = {...constants.defaultResponseMessage}
  try {
    const responseFromService = await rekeningService.getRekeningById(req.params)
    response.status = 200
    response.message = constants.rekeningMessage.REKENING_FETCHED
    response.body = responseFromService
  } catch (error) {
    response.message = error.message
  }

  return res.status(response.status).send(response)
}

module.exports.addRekening = async (req,res) => {
  let response = {...constants.defaultResponseMessage}
  try {
    const responseFromService = await rekeningService.createRekening(req.body)
    response.status = 200
    response.message = constants.rekeningMessage.REKENING_CREATED
    response.body = responseFromService
  } catch (error) {
    response.message = error.message
  }

  return res.status(response.status).send(response)
}
module.exports.updateRekening = async (req,res) => {
  let response = {...constants.defaultResponseMessage}
  try {
    const responseFromService = await rekeningService.updateRekening({ data: req.body, id: req.params.id })
    response.status = 200
    response.message = constants.rekeningMessage.REKENING_UPDATED
    response.body = responseFromService
  } catch (error) {
    response.message = error.message
  }

  return res.status(response.status).send(response)
}
module.exports.deleteRekening = async (req,res) => {
  let response = {...constants.defaultResponseMessage}
  try {
    const responseFromService = await rekeningService.deleteRekening(req.params)
    response.status = 200
    response.message = constants.rekeningMessage.REKENING_DELETED
    response.body = responseFromService
  } catch (error) {
    response.message = error.message
  }

  return res.status(response.status).send(response)
}