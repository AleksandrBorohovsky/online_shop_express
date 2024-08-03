const {Brand} = require('../models/models');
const ApiError = require('../error/ApiError');

class BrandController {
    async create(req, res, next) {
        try {
            const {name} = req.body;
            const brand = await Brand.create({name});
            res.json(brand);
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const brands = await Brand.findAll();
            res.json(brands);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new BrandController()