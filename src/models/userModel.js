const mongoose = require('mongoose');
const Schema = mongoose.Schema;

 const userModelSchema = new Schema({
  name: String,
  username: String,
  email: String,
  password: String
},{
  timestamps: true,
  toObject: {
    transform: (doc, ret, options) => {
      ret.id = ret._id
      delete ret._id
      delete ret.__v
      delete ret.password
      return ret
    }
  }
})

module.exports = mongoose.model('User',userModelSchema)
