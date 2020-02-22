const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rekeningSchema = new Schema({
  nama_rekening: String,
  nomor_rekening: Number,
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
},{
  timestamps: true,
  toObject: {
    transform: (doc, ret, options) => {
      ret.id = ret._id
      delete ret._id
      delete ret.__v
      return ret
    }
  }
})

module.exports = mongoose.model('Rekening', rekeningSchema);