const mongoose = require('mongoose')
const constans = require('./constants')

module.exports.formatMongoData = (data) => {
  if(Array.isArray(data)){
    let newDataList = []
    for(value of data){
      newDataList.push(value.toObject())
    }
    return newDataList;
  }
  return data.toObject()
}

module.exports.validObjectId = (id) => {
  if(!mongoose.Types.ObjectId.isValid(id)){
    throw new Error(constans.requestValidation.INVALID_ID)
  }
}