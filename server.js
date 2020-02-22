const express = require('express');
const dotEnv = require('dotenv');
const cors = require('cors');
const userRouters = require('./src/routers/userRouters')
const connection = require('./src/config/connection')

const app = express();
dotEnv.config();
app.use(cors())

// database connection
connection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
 

// user server
app.use('/api/v1/user',userRouters)
app.use('/api/v1/category',require('./src/routers/categoryRouters'))
app.use('/api/v1/rekening',require('./src/routers/rekeningRouters'))
app.use('/api/v1/transaksi',require('./src/routers/transactionRouters'))

// listen server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server listen on port ${PORT}`)
})


// default response
app.use((err,req,res,next) => {
  res.status(500).send({
    status: 500,
    message: err.message,
    body: {}
  })
})
