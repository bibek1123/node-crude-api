const User = require("../model/userSchema");
const messageContant = require('../config/constants/messageContant')
const { userRegistrationService, userLoginService, usersListService, singleUserService, updateUserService, deleteUserService } = require('../services/user')

// Create User: User Registration
const userRegistration = async (req, res) => {
  try {
    const result = await userRegistrationService(req.body)
    if (!result) {
      res.message = messageContant.MESSAGE.EMAIL_ALREADY_EXIST
      return util.validationErrorResponse(res)
    }
    res.message = messageContant.MESSAGE.YOU_ARE_REGISTERED_SUCCESSFULLY
    return util.successResponse(result, res)
  } catch (err) {
    console.error("Error -userRegistration-", err)
    res.message = err.message
    return util.internalServerErrorResponse(res)
  }
}

// login:
const userLogin = async (req, res) => {
  try {
    const result = await userLoginService(req.body)
    if (!result) {
      res.message = messageContant.MESSAGE.INVALID_CREADIENTIALS
      return util.validationErrorResponse(res)
    }
    res.message = messageContant.MESSAGE.YOU_ARE_LOGIN_SUCCESSFULLY
    return util.successResponse(result, res)
  } catch (err) {
    console.error("Error -userLogin-", err)
    res.message = err.message
    return util.internalServerErrorResponse(res)
  }
}

// All users list:
const usersList = async (req, res) => {
  try {
    const result = await usersListService()
    res.message = messageContant.MESSAGE.ALL_USER_ACCOUNTS_FETCHED_SUCCESSFULLY
    return util.successResponse(result, res)
  } catch (err) {
    console.error("Error -usersList-", err)
    res.message = err.message
    return util.internalServerErrorResponse(res)
  }
}

// Read User:Based on either username or email
const singleUser = async (req, res) => {
  try {
    const result = await singleUserService(req)
    if (result.length == 0) {
      res.message = messageContant.MESSAGE.YOUR_ACCOUNT_IS_NOT_FOUND
      return util.dataNotFoundResponse(res)
    }
    res.message = messageContant.MESSAGE.YOUR_ACCOUNT_FETCHED_SUCCESSFULLY
    return util.successResponse(result, res)
  } catch (err) {
    console.error("Error -singleUser-", err)
    res.message = err.message
    return util.internalServerErrorResponse(res)
  }
}

// update user data:
const updateUser = async (req, res) => {
  try {
    const result = await updateUserService(req)
    res.message = messageContant.MESSAGE.YOUR_ACCOUNT_UPDATED_SUCCESSFULLY
    return util.successResponse(result, res)
  } catch (err) {
    console.error("Error -updateUser-", err)
    res.message = err.message
    return util.internalServerErrorResponse(res)
  }
}

// delete user: soft-delete:
const deleteUser = async (req, res) => {
  try {
    const user = await deleteUserService(req)
    if (user.length == 0) {
      res.message = messageContant.MESSAGE.YOUR_ACCOUNT_IS_NOT_FOUND
      return util.dataNotFoundResponse(res)
    }
    if (user[0].canNotDel) {
      throw new Error(messageContant.MESSAGE.YOUR_ACCOUNT_CAN_NOT_BE_DELETED)
    }
    const ss = await User.updateOne({ _id: user[0]._id }, req.body);
    res.message = messageContant.MESSAGE.YOUR_ACCOUNT_DELETED_SUCCESSFULLY
    return util.successResponse({}, res)
  } catch (err) {
    console.error("Error -deleteUser-", err)
    res.message = err.message
    return util.internalServerErrorResponse(res)
  }
}

module.exports = {
  userRegistration, userLogin, usersList, singleUser, updateUser, deleteUser
}