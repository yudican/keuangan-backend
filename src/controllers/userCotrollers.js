const userService = require('../services/userService')
const constans = require('../helpers/constants')

module.exports.userCreate =async  (req,res) => {
  const response = {...constans.defaultResponseMessage}
  try {
    const responseFromServive = await userService.userCreate(req.body)
    response.status = 200
    response.message = constans.userRequest.USER_CREATED
    response.body = responseFromServive
  } catch (error) {
    console.log('something when wrong, controllers->userControllers->userCreate', error)
    response.message=error.message
  }
  return res.status(response.status).send(response)
}

module.exports.getUserByid = async (req,res) => {
  let response = {...constans.defaultResponseMessage}
  try {
    const responseFromService = await userService.getUserById(req.params)
    response.status = 200
    response.message = constans.userRequest.USER_FETCHED
    response.body = responseFromService
  } catch (error) {
    response.message = error.message
  }

  return res.status(response.status).send(response)
}

module.exports.userLogin = async  (req,res) => {
  const response = {...constans.defaultResponseMessage}
  try {
    const responseFromServive = await userService.userLogin(req.body)
    response.status = 200
    response.message = constans.userRequest.LOGIN_SUCCESS
    response.body = responseFromServive
  } catch (error) {
    console.log('something when wrong, controllers->userControllers->userLogin', error)
    response.message=error.message
  }
  return res.status(response.status).send(response)
}
module.exports.userUpdateProfile = async (req,res) => {
  const response = {...constans.defaultResponseMessage}
  try {
    const responseFromServive = await userService.userUpdateProfile({ data:req.body, id:req.params.id })
    response.status = 200
    response.message = constans.userRequest.SUCCESS_UPDATED_PROFILE
    response.body = responseFromServive
  } catch (error) {
    console.log('something when wrong, controllers->userControllers->userupdateProfile', error)
    response.message=error.message
  }
  return res.status(response.status).send(response)
}