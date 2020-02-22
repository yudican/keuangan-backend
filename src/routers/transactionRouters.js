const express = require('express')
const validation = require('../middleware/validation')
const transactionValidationSchema = require('../apiSchema/transactionValidationSchema')
const transactionController = require('../controllers/transactionControllers')
const tokenValidation = require('../middleware/tokenValidation')

const route = express.Router()

route.get('/',
  tokenValidation,
  transactionController.getTransaction
)

route.get('/report',
  tokenValidation,
  validation.validateParams(transactionValidationSchema.getRangeDate),
  transactionController.getTransactionReport
)

route.get('/:id',
  tokenValidation,
  transactionController.getTransactionByid
)

route.post('/', 
  tokenValidation,
  validation.validateBody(transactionValidationSchema.transactionSchema),
  transactionController.addTransaction
)

route.put('/:id', 
  tokenValidation,
  validation.validateBody(transactionValidationSchema.transactionSchema),
  transactionController.updateTransaction
)

route.delete('/:id', 
  tokenValidation,
  transactionController.deleteTransaction
)

module.exports = route