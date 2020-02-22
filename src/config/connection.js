const mongoose = require('mongoose')

module.exports = async () => {
  try {
    await mongoose.connect(process.env.DB_URL,{useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
    console.log('databases connected')
  } catch (error) {
    console.log('databases connection error')
  }
}