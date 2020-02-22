const categoryService = require('../services/categoryService');
const constants = require('../helpers/constants');


module.exports.getCategory = async (req,res) => {
  let response = {...constants.defaultResponseMessage}
  try {
    const responseFromService = await categoryService.getCategories()
    response.status = 200
    response.message = constants.categoriesMessage.CATEGORY_FETCHED
    response.body = responseFromService
  } catch (error) {
    response.message = error.message
  }

  return res.status(response.status).send(response)
}

module.exports.getCategoryByid = async (req,res) => {
  let response = {...constants.defaultResponseMessage}
  try {
    const responseFromService = await categoryService.getCategoriesById(req.params)
    response.status = 200
    response.message = constants.categoriesMessage.CATEGORY_FETCHED
    response.body = responseFromService
  } catch (error) {
    response.message = error.message
  }

  return res.status(response.status).send(response)
}

module.exports.addCategory = async (req,res) => {
  let response = {...constants.defaultResponseMessage}
  try {
    const responseFromService = await categoryService.createCategories(req.body)
    response.status = 200
    response.message = constants.categoriesMessage.CATEGORY_CREATED
    response.body = responseFromService
  } catch (error) {
    response.message = error.message
  }

  return res.status(response.status).send(response)
}
module.exports.updateCategory = async (req,res) => {
  let response = {...constants.defaultResponseMessage}
  try {
    const responseFromService = await categoryService.updateCategories({ data: req.body, id: req.params.id })
    response.status = 200
    response.message = constants.categoriesMessage.CATEGORY_UPDATED
    response.body = responseFromService
  } catch (error) {
    response.message = error.message
  }

  return res.status(response.status).send(response)
}
module.exports.deleteCategory = async (req,res) => {
  let response = {...constants.defaultResponseMessage}
  try {
    const responseFromService = await categoryService.deleteCategories(req.params)
    response.status = 200
    response.message = constants.categoriesMessage.CATEGORY_DELETED
    response.body = responseFromService
  } catch (error) {
    response.message = error.message
  }

  return res.status(response.status).send(response)
}