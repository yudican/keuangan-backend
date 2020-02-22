const Transaction = require('../models/transactionModel')
const Rekening = require('../models/rekeningModel')
const Category = require('../models/categoryModel')
const constants = require('../helpers/constants')
const mongoose = require('mongoose')
const { formatMongoData,validObjectId } = require('../helpers/dbHelper')

module.exports.getRekening = async () => {
  try {
    const results = await Rekening.find()
    if (!results) {
      throw new Error(constants.rekeningMessage.REKENING_NOT_FOUND)
    }
    return formatMongoData(results)
  } catch (error) {
    console.log('something when wrong,service->rekeningService->getRekening',error)
    throw new Error(error)
  }
}

module.exports.getRekeningDetail = async ({ walletId, user_id }) => {
  try {
    const results = await Transaction.aggregate([
      {
        $lookup: {
          from: Rekening.collection.name,
          localField: "rekening_id",
          foreignField: "_id",
          as: "rekening" 
        }
      },
      {
        $lookup: {
          from: Category.collection.name,
          localField: "category_id",
          foreignField: "_id",
          as: "kategori" 
        }
      },
      {
        $unwind: '$kategori'
      },
      {
        $unwind: '$rekening'
      },
      {
        $match: {
          "rekening.user_id": {
            $in: [mongoose.Types.ObjectId(user_id)]
          },
          "rekening._id": {
            $in: [mongoose.Types.ObjectId(walletId)]
          }
        }
      },
      {
        $group: {
          _id: "$tanggal",
          result: {$push: "$$ROOT"},
        }
      },
      { 
        $sort: { 
          _id: -1 
        } 
      }
    ])

    const transactions = await Transaction.aggregate([
      {
        $lookup: {
          from: Rekening.collection.name,
          localField: "rekening_id",
          foreignField: "_id",
          as: "rekening" 
        }
      },
      {
        $lookup: {
          from: Category.collection.name,
          localField: "category_id",
          foreignField: "_id",
          as: "kategori" 
        }
      },
      {
        $match: {
          "rekening.user_id": {
            $in: [mongoose.Types.ObjectId(user_id)]
          },
          "rekening._id": {
            $in: [mongoose.Types.ObjectId(walletId)]
          }
        }
      },
      {
        $group: {
          _id: "$jenis",
          balance: {$sum: "$nominal"},
        }
      }
    ])

    if (!results) {
      throw new Error(constants.transaktionMessage.TRANSACTION_NOT_FOUND)
    }
    const newResults = {
      results,
      transactions
    }
    return newResults
  } catch (error) {
    console.log('something when wrong,service->RekeningService->getRekeningDetail',error)
    throw new Error(error)
  }
}

module.exports.getRekeningById = async ({id}) => {
  try {
    // check valid object id
    validObjectId(id);
    const results = await Rekening.findById(id)
    if (!results) {
      throw new Error(constants.rekeningMessage.REKENING_NOT_FOUND)
    }
    return formatMongoData(results)
  } catch (error) {
    console.log('something when wrong,service->rekeningService->getRekeningById',error)
    throw new Error(error)
  }
}

module.exports.createRekening = async (data) => {
  try {
    const newRekening = new Rekening(data)
    const result = await newRekening.save()
    return formatMongoData(result)
  } catch (error) {
    console.log('something when wrong,service->rekeningService->createRekening',error)
    throw new Error(error)
  }
}


module.exports.updateRekening = async ({data,id}) => {
  try {
    validObjectId(id);
    const result = await Rekening.findByIdAndUpdate({ _id:id }, data, {new:true})
    if(!result){
      throw new Error(constants.rekeningMessage.REKENING_NOT_FOUND)
    }
    return formatMongoData(result)
  } catch (error) {
    console.log('something when wrong,service->rekeningService->updateRekening',error)
    throw new Error(error)
  }
}
module.exports.deleteRekening = async ({id}) => {
  try {
    validObjectId(id);
    const cekTransaction = await Transaction.find({ rekening_id: id })
    if(cekTransaction){
      await Transaction.deleteMany({ rekening_id: id })
    }
    const result = await Rekening.findByIdAndDelete(id)
    if(!result){
      throw new Error(constants.rekeningMessage.REKENING_NOT_FOUND)
    }
    return formatMongoData(result)
  } catch (error) {
    console.log('something when wrong,service->rekeningService->deleteRekening',error)
    throw new Error(error)
  }
}