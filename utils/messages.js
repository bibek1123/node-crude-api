const responseCode = require('./responseCode')
const { RESPONSE_CODE } = require('../config/constants/responseCodeConstant')

exports.successResponse = (data, res) => {
    return res.status(responseCode.success).json({
        code: RESPONSE_CODE.DEFAULT,
        message: res.message,
        data: data,
    });
};

exports.validationErrorResponse = (res) => {
    return res.status(responseCode.validationError).json({
        code: RESPONSE_CODE.ERROR,
        message: res.message,
        data: {},
    });
};

exports.internalServerErrorResponse = (res) => {
    return res.status(responseCode.internalServerError).json({
        code: RESPONSE_CODE.ERROR,
        message: res.message,
        data: {},
    });
};

exports.unauthorizedResponse = (res) => {
    return res.status(responseCode.Unauthorized).json({
        code: RESPONSE_CODE.ERROR,
        message: res.message,
        data: {},
    });
};

exports.dataNotFoundResponse = (res) => {
    return res.status(responseCode.notFound).json({
        code: RESPONSE_CODE.ERROR,
        message: res.message,
        data: {},
    });
};