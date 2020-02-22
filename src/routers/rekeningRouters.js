const express = require('express')
const validation = require('../middleware/validation')
const rekeningValidationSchema = require('../apiSchema/rekeningValidationSchema')
const rekeningController = require('../controllers/rekeningController')
const tokenValidation = require('../middleware/tokenValidation')

const route = express.Router()

route.get('/',
  tokenValidation,
  rekeningController.getRekening
)
route.get('/detail',
  tokenValidation,
  rekeningController.getRekeningDetail
)

route.get('/:id',
  tokenValidation,
  rekeningController.getRekeningByid
)

route.post('/', 
  tokenValidation,
  validation.validateBody(rekeningValidationSchema.rekeningSchema),
  rekeningController.addRekening
)

route.put('/:id', 
  tokenValidation,
  validation.validateBody(rekeningValidationSchema.rekeningSchema),
  rekeningController.updateRekening
)

route.delete('/:id', 
  tokenValidation,
  rekeningController.deleteRekening
)

module.exports = route