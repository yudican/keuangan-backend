const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchemaModel = new Schema({
  type: String,
  name: String
},{
  toObject: {
    transform: (doc, ret, options) => {
      ret.id = ret._id
      delete ret._id
      delete ret.__v
      return ret
    }
  }
})

module.exports = mongoose.model('Category', categorySchemaModel);