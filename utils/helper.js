const User = require('../model/userSchema')
const jwt = require("jsonwebtoken");
const { JWT } = require('../config/config');
const generateTokenAndUpdateUser = async function (userId) {
    try {
        const token = jwt.sign({ _id: userId }, JWT.SECRET_KEY, {
            expiresIn: JWT.JWT_TOKEN_EXPIRE,
        })
        const user = await User.findOneAndUpdate({ _id: userId }, { $push: { tokens: { token } } }, { new: true }).select('-password -tokens').lean()
        return { ...user, token };
    } catch (err) {
        console.error("Error - generateTokenAndUpdateUser-", err)
        throw new Error(err)

    }
};


module.exports = {
    generateTokenAndUpdateUser
}