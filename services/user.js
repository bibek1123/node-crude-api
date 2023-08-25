const User = require('../model/userSchema')
const { generateTokenAndUpdateUser } = require('../utils/helper')
const userRegistrationService = async function (bodyData) {
    try {
        const userExit = await User.findOne({ email: bodyData.email });
        if (userExit) {
            return false
        }
        let user = await new User(bodyData)
        await user.save()

        //generate token:
        const data = await generateTokenAndUpdateUser(user._id);
        return data
    } catch (err) {
        console.error("Error - userRegistrationService-", err)
        throw new Error(err)
    }
};

const userLoginService = async function (bodyData) {
    try {
        const { email, password } = bodyData;
        const userLogin = await User.findOne({ email: email })
        if (userLogin) {
            const isMatch = await userLogin.isPasswordMatch(password);
            if (isMatch) return await generateTokenAndUpdateUser(userLogin._id)
        }
        return false
    } catch (err) {
        console.error("Error - userLoginService-", err)
        throw new Error(err)
    }
};

const usersListService = async function () {
    try {
        return await User.find({}).select('-password -tokens')
    } catch (err) {
        console.error("Error - usersListService-", err)
        throw new Error(err)
    }
};

const singleUserService = async function (req) {
    try {
        const query = req.params.query;
        return await User.find({ $or: [{ username: query }, { email: query }] }).select('-password -tokens')
    } catch (err) {
        console.error("Error - singleUserService-", err)
        throw new Error(err)
    }
};

const updateUserService = async function (req) {
    try {
        const _id = req.params.id;
        return await User.findByIdAndUpdate(_id, req.body, {
            new: true,
        }).select('-password -tokens')
    } catch (err) {
        console.error("Error - updateUserService-", err)
        throw new Error(err)
    }
};


const deleteUserService = async function (req) {
    try {
        const query = req.params.query;
        return await User.find({ $or: [{ username: query }, { email: query }] })
    } catch (err) {
        console.error("Error - deleteUserService-", err)
        throw new Error(err)
    }
};


module.exports = {
    generateTokenAndUpdateUser,
    userRegistrationService,
    userLoginService,
    usersListService,
    singleUserService,
    updateUserService,
    deleteUserService
}
