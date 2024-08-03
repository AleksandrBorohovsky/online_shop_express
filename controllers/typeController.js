const {Type} = require('../models/models');
const ApiError = require('../error/ApiError');

class TypeController {
    async create(req, res, next) {
        try {
            const {name} = req.body;
            const type = await Type.create({name});
            res.json(type);
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        try {
            const types = await Type.findAll();
            res.json(types);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new TypeController()