const User = require('../models/userModel')
const constants = require('../helpers/constants')
const bcrypt = require('bcrypt')
const { formatMongoData, validObjectId } = require('../helpers/dbHelper')
const jwt = require('jsonwebtoken')

module.exports.userCreate = async (data) => {
  try {
    const checkUser = await User.findOne({ email:data.email })
    if(checkUser){
      throw new Error(constants.userRequest.DUPLICATE_EMAIL)
    }
    const password = await bcrypt.hash(data.password,12)
    const newUser = new User({ ...data, password })
    const result = await newUser.save()
    return formatMongoData(result)
  } catch (error) {
    console.log('something when wrong, service->userService->userCreate: ',error)
    throw new Error(error)
  }
}

module.exports.getUserById = async ({id}) => {
  try {
    // check valid object id
    validObjectId(id);
    const results = await User.findById(id)
    if (!results) {
      throw new Error(constants.userRequest.USER_NOTFOUND)
    }
    return formatMongoData(results)
  } catch (error) {
    console.log('something when wrong,service->userService->getUserById',error)
    throw new Error(error)
  }
}

module.exports.userLogin = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email }); //{email:email}
    if(!user){
      throw new Error(constants.userRequest.USER_NOTFOUND)
    }
    const isValid = await bcrypt.compare(password, user.password)
    if(!isValid){
      throw new Error(constants.userRequest.INVALID_PASSWORD)
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY || 'X-API-KEY', { expiresIn: '7d' })
    return { token }
  } catch (error) {
    throw new Error(error)  
  }
}

module.exports.userUpdateProfile = async ({ data, id}) => {
  try {
    let newData = {};
    if(data.password){
      const newPassword = await bcrypt.hash(data.password, 12)
      newData = await { ...data, password:newPassword }
    }
    const dataUpdate = await data.password ? newData : data
    const updateProfile = await User.findByIdAndUpdate({ _id:id }, dataUpdate, { new: true })
    return formatMongoData(updateProfile)
  } catch (error) {
    throw new Error(error)  
  }
}