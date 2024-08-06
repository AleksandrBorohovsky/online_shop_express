const ApiError = require('../error/ApiError');

module.exports = (schema) => (req, res, next) => {
    const {error, data} = schema.validate(req.body, {abortEarly: false});

    if(error) {
        console.log(error);
        return res.json(ApiError.badRequest(error.details));
    }

    req.body = data;
    next();
}