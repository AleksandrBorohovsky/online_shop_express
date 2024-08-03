const ApiError = require('../error/ApiError');
require('dotenv').config();
const {Rating, Device} = require('../models/models');
const jwt = require('jsonwebtoken')

class RatingController {
    async setRating(req, res, next) {
        try {
            const {rating, deviceId} = req.body;
            const user = req.user;
            const device = await Device.findOne({where: {id: deviceId}});
            await Rating.create({rating, deviceId, userId: user.id});
            const deviceRatings = await Rating.findAll({where: {deviceId}});
            let ratingsSum = 0;
            for(let i = 0; i<deviceRatings.length; i++) {
                ratingsSum += deviceRatings[i].rating;
            }
            if(!deviceRatings) {
                device.rating = rating;
                await device.save();
            } else {
                device.rating =  ((ratingsSum + rating) / (deviceRatings.length + 1)).toFixed(1);
                await device.save();
            }
            res.json({rating});
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async getRating(req, res, next) {
        try {
            const {id} = req.params;
            const device = await Device.findOne({where:{id}});
            if(!device) {
                return next(ApiError.internal('Device with this id is not exist'));
            }
            res.json({rating: device.rating});
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new RatingController()