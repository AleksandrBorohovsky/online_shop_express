const jwt = require('jsonwebtoken');
const ApiError = require('../error/ApiError');

module.exports = function(role) {
    return function (req, res, next) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            if(!token) {
                return res.status(401).json({message: 'Unauthorized'});
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            if(decoded.roles != role) {
                return next(ApiError.badRequest('No access'));
            }
            req.user = decoded; 
    
            next();
        } catch (e) {
            res.status(401).json({message: 'Unauthorized'});
        }
    }
}