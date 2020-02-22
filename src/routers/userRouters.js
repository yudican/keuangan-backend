const express = require('express')
const validation = require('../middleware/validation')
const userSchemaValidation = require('../apiSchema/userValidationSchema')
const userControllers = require('../controllers/userCotrollers')
const tokenValidation = require('../middleware/tokenValidation')

const router = express.Router()

router.post('/create',
  validation.validateBody(userSchemaValidation.userCreate),
  userControllers.userCreate
)

router.post('/login',
  validation.validateBody(userSchemaValidation.userLogin),
  userControllers.userLogin
)

router.get('/detail/:id',
  tokenValidation,
  userControllers.getUserByid
)

router.put('/update/:id',
  tokenValidation,
  validation.validateBody(userSchemaValidation.userUpdate),
  userControllers.userUpdateProfile
)
module.exports = router;