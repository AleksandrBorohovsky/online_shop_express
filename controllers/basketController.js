const {Basket, BasketDevice, Device} = require('../models/models');
const ApiError = require('../error/ApiError');

class BasketController {
    async addDevice(req, res, next) {
        try {
            const {deviceId} = req.body;
            const userId = req.user.id;
            let basket = await Basket.findOne({where: {userId}})
            if(!basket) {
                basket = await Basket.create({userId});
            }

            const basket_device = await BasketDevice.create({basketId: basket.id, deviceId});

            res.json(basket_device);
        } catch (e) {
            console.log(e);
            next(ApiError.internal(e.message));
        }
    }

    async showBasket(req, res, next) {
        try {
            const userId = req.user.id;
            console.log(userId);
            let basket = await Basket.findOne({where: {userId}});
            if(!basket) {
                basket = await Basket.create({userId});
            }
            const basketDevices = await BasketDevice.findAll({where: {basketId: basket.id}});
            let devicesId = [];
            basketDevices.forEach(el => {
                devicesId.push(el.deviceId);
            })
            console.log(devicesId);
            let devices = await Device.findAll({where: {id: devicesId}});

            res.json({devices})
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }
}

module.exports = new BasketController();