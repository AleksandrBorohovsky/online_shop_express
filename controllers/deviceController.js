const {Device, DeviceInfo} = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');

class DeviceController {
    async create(req, res, next) {
        try {
            const {name, price, brandId, typeId, info} = req.body;
            const {img} = req.files;
            let fileName = uuid.v4() + '.jpg';
            img.mv(path.resolve(__dirname, '..', 'static', fileName));

            const device = await Device.create({name, price, brandId, typeId, img: fileName});

            if(info) {
                info = JSON.parse(info);
                info.forEach(i => {
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                });

            }

            res.json(device);
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res, next) {
        try {
            let {typeId, brandId, limit, page} = req.query;
            page = page || 1;
            limit = limit || 9;
            let offset = page * limit - limit;
            let devices;
            if(!typeId && !brandId) {
                devices = await Device.findAndCountAll({limit, offset});
            }
            if(typeId && !brandId) {
                devices = await Device.findAndCountAll({where: {typeId}, limit, offset});
            }
            if(!typeId && brandId) {
                devices = await Device.findAndCountAll({where: {brandId}, limit, offset});
            }
            if(typeId && brandId) {
                devices = await Device.findAndCountAll({where: {typeId, brandId}, limit, offset});
            }

            res.json(devices);
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params;
            const device = await Device.findOne({
                where: {id}, 
                include: [{model: DeviceInfo, as: 'info'}]
            });
            res.json(device); 
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new DeviceController()