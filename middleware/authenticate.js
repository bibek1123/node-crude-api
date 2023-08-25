const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");
const messageContant = require('../config/constants/messageContant')
const responseCode = require("../utils/responseCode");
const { JWT } = require('../config/config')

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const verifyToken = jwt.verify(token, JWT.SECRET_KEY);
    const rootUser = await User.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });

    if (!rootUser) {
      throw new Error(messageContant.MESSAGE.USER_NOT_FOUND);
    }
    req.token = token;
    req.rootUser = rootUser;
    req.userId = rootUser._id;
    req.userEmail = rootUser.email;
    next();
  } catch (err) {
    console.error("Error - authenticate-", err)
    res.message = err.message
    return util.unauthorizedResponse(res)
  }
};

module.exports = authenticate;
