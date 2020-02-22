const express = require('express')
const validation = require('../middleware/validation')
const categoriesValidationSchema = require('../apiSchema/categoryValidationSchema')
const categoryController = require('../controllers/categoryCotrollers')
const tokenValidation = require('../middleware/tokenValidation')

const route = express.Router()

route.get('/',
  tokenValidation,
  categoryController.getCategory
)

route.get('/:id',
  tokenValidation,
  categoryController.getCategoryByid
)

route.post('/', 
  tokenValidation,
  validation.validateBody(categoriesValidationSchema.categoriesSchema),
  categoryController.addCategory
)

route.put('/:id', 
  tokenValidation,
  validation.validateBody(categoriesValidationSchema.categoriesSchema),
  categoryController.updateCategory
)

route.delete('/:id', 
  tokenValidation,
  categoryController.deleteCategory
)

module.exports = route