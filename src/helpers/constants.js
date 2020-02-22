module.exports = {
  defaultResponseMessage:{
    status: 400,
    message: '',
    body: {}
  },
  requestValidation: {
    BAD_REQUEST:'Invalid Field',
    INVALID_ID: 'Invalid ID',
    MISSING_TOKEN: 'Can\'t find token in header'
  },
  userRequest: {
    USER_FETCHED: 'Fetched Successfully',
    DUPLICATE_EMAIL: 'User with given email already exist',
    USER_CREATED: 'New user successfully added',
    USER_UPDATED: 'Successfully when updated user',
    USER_DELETED: 'Successfully when deleted user',
    USER_NOTFOUND: 'User not found',
    INVALID_PASSWORD: 'You must provide valid password',
    LOGIN_SUCCESS: 'Login Succesfully',
    SUCCESS_UPDATED_PROFILE: 'Profile success updated'
  },
  categoriesMessage: {
    NOT_FOUND: 'Categories not found',
    CATEGORY_FETCHED: 'Fetched Successfully',
    CATEGORY_CREATED: 'Successfully when added new categories',
    CATEGORY_UPDATED: 'Successfully when updated categories',
    CATEGORY_DELETED: 'Successfully when deleted categories',
  },
  rekeningMessage: {
    REKENING_NOT_FOUND: 'Rekening not found',
    REKENING_FETCHED: 'Fetched Successfully',
    REKENING_CREATED: 'Successfully when added new Rekening',
    REKENING_UPDATED: 'Successfully when updated Rekening',
    REKENING_DELETED: 'Successfully when deleted Rekening',
  },
  transaktionMessage: {
    TRANSACTION_NOT_FOUND: 'Transaction not found',
    TRANSACTION_FETCHED: 'Fetched Successfully',
    TRANSACTION_CREATED: 'Successfully when added new Transaction',
    TRANSACTION_UPDATED: 'Successfully when updated Transaction',
    TRANSACTION_DELETED: 'Successfully when deleted Transaction',
  }
  

}