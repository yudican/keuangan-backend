const Category = require('../models/categoryModel')
const Transaction = require('../models/transactionModel')
const constants = require('../helpers/constants')
const { formatMongoData,validObjectId } = require('../helpers/dbHelper')

module.exports.getCategories = async () => {
  try {
    const results = await Category.find()
    if (!results) {
      throw new Error(constants.categoriesMessage.NOT_FOUND)
    }
    return formatMongoData(results)
  } catch (error) {
    console.log('something when wrong,service->categoryService->getCategories',error)
    throw new Error(error)
  }
}

module.exports.getCategoriesById = async ({id}) => {
  try {
    // check valid object id
    validObjectId(id);
    const results = await Category.findById(id)
    if (!results) {
      throw new Error(constants.categoriesMessage.NOT_FOUND)
    }
    return formatMongoData(results)
  } catch (error) {
    console.log('something when wrong,service->categoryService->getCategoriesById',error)
    throw new Error(error)
  }
}

module.exports.createCategories = async (data) => {
  try {
    const newCategory = new Category(data)
    const result = await newCategory.save()
    return formatMongoData(result)
  } catch (error) {
    console.log('something when wrong,service->categoryService->createCategories',error)
    throw new Error(error)
  }
}


module.exports.updateCategories = async ({data,id}) => {
  try {
    validObjectId(id);
    const result = await Category.findByIdAndUpdate({ _id:id }, data, {new:true})
    if(!result){
      throw new Error(constants.categoriesMessage.NOT_FOUND)
    }
    return formatMongoData(result)
  } catch (error) {
    console.log('something when wrong,service->categoryService->updateCategories',error)
    throw new Error(error)
  }
}
module.exports.deleteCategories = async ({id}) => {
  try {
    validObjectId(id);
    
    const cekTransaction = await Transaction.find({ category_id: id })
    if(cekTransaction){
      await Transaction.deleteMany({ category_id: id })
    }
    const result = await Category.findByIdAndDelete(id)
    if(!result){
      throw new Error(constants.categoriesMessage.NOT_FOUND)
    }
    return formatMongoData(result)
  } catch (error) {
    console.log('something when wrong,service->categoryService->deleteCategories',error)
    throw new Error(error)
  }
}