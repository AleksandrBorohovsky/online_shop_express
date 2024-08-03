const {User} = require('../models/models');
const ApiError = require('../error/ApiError');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateJwt = (id, email, roles) => {
    const payload = {id, email, roles};
    return jwt.sign(payload, process.env.SECRET_KEY);
}

class UserController {
    async registration(req, res, next) {
        try {
            const {email, password, role} = req.body;
            const hashPass = bcrypt.hashSync(password, 5);
            const user = await User.create({email, password: hashPass, role});
            const token = generateJwt(user.id, user.email, user.password);

            res.json(token)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const candidate = await User.findOne({email});
            if(!candidate) {
                return next(ApiError.badRequest('Incorrect email'));
            }
            const comparePass = bcrypt.compare(password, candidate.password);
            if(!comparePass) {
                return next(ApiError.badRequest('Incorrect password'));
            }

            const token = generateJwt(candidate.id, candidate.email, candidate.password);

            res.json(token);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        const users = await User.findAll();

        res.json(users);
    }
}

module.exports = new UserController();