const Transaction = require('../models/transactionModel')
const Rekening = require('../models/rekeningModel')
const Category = require('../models/categoryModel')
const mongoose = require('mongoose')
const constants = require('../helpers/constants')
const { formatMongoData,validObjectId } = require('../helpers/dbHelper')

module.exports.getTransaction = async (user_id) => {
  try {
    const total = await Rekening.aggregate([
      {
        $lookup: {
          from: Transaction.collection.name,
          localField: "_id",
          foreignField: "rekening_id",
          as: "transaksi" 
        }
      },
      {
        $match: {
          "user_id": {
            $in: [mongoose.Types.ObjectId(user_id)]
          }
        }
      },
      {
        $unwind: "$transaksi",
        $unwind: {
          path: "$transaksi",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $group: {
          _id: "$_id",
          balance: {$sum: "$transaksi.nominal"},
          detail : { $addToSet: {
              id: "$_id",
              nama: "$nama_rekening",
              rekening: "$nomor_rekening"
          }},
        }
      },
      { 
        $sort: { 
          "balance": -1 
        } 
      },
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
        $match: {
          "rekening.user_id": {
            $in: [mongoose.Types.ObjectId(user_id)]
          }
        }
      },
      { $sort: { tanggal: -1 } },
      { $unwind: "$rekening"},
      { $unwind: "$kategori"},
      {
        $group: {
          _id: null,
          history: {$push: "$$ROOT"}
        }
      }
    ])
    if (!transactions) {
      throw new Error(constants.transaktionMessage.TRANSACTION_NOT_FOUND)
    }
    const newResults = {
      results,
      wallet: total,
      transactions
    }
    return newResults
  } catch (error) {
    console.log('something when wrong,service->TransactionService->getTransaction',error)
    throw new Error(error)
  }
}

module.exports.getTransactionReport = async ({start, end, user_id}) => {
  try {
    const total = await Transaction.aggregate([
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
          tanggal: {
            $gte: new Date(start),
            $lte: new Date(end)
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
    if (!total) {
      throw new Error(constants.transaktionMessage.TRANSACTION_NOT_FOUND)
    }
    console.log(new Date(start))
    const newResults = {
      total
    }
    return newResults
  } catch (error) {
    console.log('something when wrong,service->TransactionService->getTransactionReport',error)
    throw new Error(error)
  }
}

module.exports.getTransactionById = async ({id}) => {
  try {
    // check valid object id
    validObjectId(id);
    const results = await Transaction.findById(id).populate('category_id','name').populate('rekening_id','nama_rekening')
    if (!results) {
      throw new Error(constants.transaktionMessage.TRANSACTION_NOT_FOUND)
    }
    return formatMongoData(results)
  } catch (error) {
    console.log('something when wrong,service->TransactionService->getTransactionById',error)
    throw new Error(error)
  }
}

module.exports.createTransaction = async (data) => {
  try {
    const newTransaction = new Transaction({...data, tanggal: new Date(data.tanggal)})
    const result = await newTransaction.save()
    return formatMongoData(result)
  } catch (error) {
    console.log('something when wrong,service->TransactionService->createTransaction',error)
    throw new Error(error)
  }
}


module.exports.updateTransaction = async ({data,id}) => {
  try {
    validObjectId(id);
    const result = await Transaction.findByIdAndUpdate({ _id:id }, data, {new:true})
    if(!result){
      throw new Error(constants.transaktionMessage.TRANSACTION_NOT_FOUND)
    }
    return formatMongoData(result)
  } catch (error) {
    console.log('something when wrong,service->TransactionService->updateTransaction',error)
    throw new Error(error)
  }
}
module.exports.deleteTransaction = async ({id, value}) => {
  try {
    validObjectId(id);
    const result = await Transaction.findByIdAndDelete(id)
    if(!result){
      throw new Error(constants.transaktionMessage.TRANSACTION_NOT_FOUND)
    }
    return formatMongoData(result)
  } catch (error) {
    console.log('something when wrong,service->TransactionService->deleteTransaction',error)
    throw new Error(error)
  }
}