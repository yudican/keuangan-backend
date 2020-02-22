const transactionService = require('../services/transaksiService');
const constants = require('../helpers/constants');


module.exports.getTransaction = async (req,res) => {
  let response = {...constants.defaultResponseMessage}
  try {
    const responseFromService = await transactionService.getTransaction(req.query.user_id)
    response.status = 200
    response.message = constants.transaktionMessage.TRANSACTION_FETCHED
    response.body = responseFromService
  } catch (error) {
    response.message = error.message
  }

  return res.status(response.status).send(response)
}

module.exports.getTransactionReport = async (req,res) => {
  let response = {...constants.defaultResponseMessage}
  try {
    const responseFromService = await transactionService.getTransactionReport(req.query)
    response.status = 200
    response.message = constants.transaktionMessage.TRANSACTION_FETCHED
    response.body = responseFromService
  } catch (error) {
    response.message = error.message
  }

  return res.status(response.status).send(response)
}

module.exports.getTransactionByid = async (req,res) => {
  let response = {...constants.defaultResponseMessage}
  try {
    const responseFromService = await transactionService.getTransactionById(req.params)
    response.status = 200
    response.message = constants.transaktionMessage.TRANSACTION_FETCHED
    response.body = responseFromService
  } catch (error) {
    response.message = error.message
  }

  return res.status(response.status).send(response)
}

module.exports.addTransaction = async (req,res) => {
  let response = {...constants.defaultResponseMessage}
  try {
    const responseFromService = await transactionService.createTransaction(req.body)
    response.status = 200
    response.message = constants.transaktionMessage.TRANSACTION_CREATED
    response.body = responseFromService
  } catch (error) {
    response.message = error.message
  }

  return res.status(response.status).send(response)
}
module.exports.updateTransaction = async (req,res) => {
  let response = {...constants.defaultResponseMessage}
  try {
    const responseFromService = await transactionService.updateTransaction({ data: req.body, id: req.params.id })
    response.status = 200
    response.message = constants.transaktionMessage.TRANSACTION_UPDATED
    response.body = responseFromService
  } catch (error) {
    response.message = error.message
  }

  return res.status(response.status).send(response)
}
module.exports.deleteTransaction = async (req,res) => {
  let response = {...constants.defaultResponseMessage}
  try {
    const responseFromService = await transactionService.deleteTransaction(req.params)
    response.status = 200
    response.message = constants.transaktionMessage.TRANSACTION_DELETED
    response.body = responseFromService
  } catch (error) {
    response.message = error.message
  }

  return res.status(response.status).send(response)
}