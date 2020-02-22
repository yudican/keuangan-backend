const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  category_id: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  },
  rekening_id: {
    type: Schema.Types.ObjectId,
    ref: 'Rekening'
  },
  jenis: String,
  nominal: Number,
  tanggal: Date,
  keterangan: String 
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

module.exports = mongoose.model('Transaksi', transactionSchema)