import express from "express";
import Joi from "joi";
import {Addresses} from "../../models/addresses.js";
import {Op} from "sequelize";
import {Cities, Regions} from "../../models/associations.js";
import {authWebsite} from "../../server/middleware/authWebsite.js";


const router = express.Router();


router.post("/address/create", async (req, res) => {

    const data = req.body;
    console.log('DATA ADDRESS', data);

    const addressSchema = Joi.object({
        clientId: Joi.number().integer().required(),
        name: Joi.string().required().messages({
            'string.empty': 'Имя обязательно для заполнения',
            'any.required': 'Имя обязательно для заполнения',
        }),
        surname: Joi.string().required().messages({
            'string.empty': 'Фамилия обязательна для заполнения',
            'any.required': 'Фамилия обязательна для заполнения',
        }),
        region: Joi.string().required().messages({
            'string.empty': 'Регион обязателен для заполнения',
            'any.required': 'Регион обязателен для заполнения',
        }),
        city: Joi.string().required().messages({
            'string.empty': 'Город обязателен для заполнения',
            'any.required': 'Город обязателен для заполнения',
        }),
        phone: Joi.string()
            .pattern(/^\d{11}$/)
            .required()
            .messages({
                'string.pattern.base': 'Телефон должен состоять из 11 цифр',
                'string.empty': 'Телефон обязателен для заполнения',
                'any.required': 'Телефон обязателен для заполнения',
            }),
        address: Joi.string().required().messages({
            'string.empty': 'Адрес обязателен для заполнения',
            'any.required': 'Адрес обязателен для заполнения',
        }),
    })

    const {error, value} = addressSchema.validate(req.body, {abortEarly: false});
    if (error) {
        return res.status(400).json({
            message: 'Ошибка валидации',
            errors: error.details.map((err) => err.message),
        });
    }
    const {clientId, name, surname, region, city, phone, address} = value;

    await Addresses.update({
            isActual: 0,
        },
        {
            where: {
                client_id: clientId,
                deleted_at: 0,
            }
        }
    )

    if (clientId, name, surname, region, city, phone, address) {
        const newAddress = await Addresses.create({
            client_id: clientId,
            region_id: region,
            city_id: city,
            address_name: address,
            isActual: 1,
            deleted_at: 0
        })
    }


    const addresses = await Addresses.findAll({
        where: {
            client_id: clientId,
            deleted_at: 0
        }
    })


    res.status(201).json({
        success: true,
        message: 'Адрес успешно создан',
        data: addresses
    });

})


router.get("/addresses/get", async (req, res) => {

    const data = req.query;
    console.log('DATA ADDRESS GET', data);


    const result = await Addresses.findAll({
        where: {
            client_id: data.clientId,
            deleted_at: 0,
        },
        include: [
            {
                model: Cities,
                attributes: ['city_name'],
                include: [
                    {
                        model: Regions,
                        attributes: ['region_name'],
                    }
                ]
            }
        ]
    })

    const actualAddress = result.find(address => address.isActual === 1);

    if (result === null) {
        res.json({
            success: false,
            message: "Адреса не найдены"
        })
    }

    res.json({
        success: true,
        data: result,
        actualAddress: actualAddress || null
    });

})


router.post("/address/update", async (req, res) => {

    const data = req.body;
    console.log('DATA ADDRESS UPDATE', data);

    const addressToUpdate = await Addresses.findOne({
        where: {
            address_id: data.addressId
        }
    })
    await addressToUpdate.update({
        isActual: data.flag,
    })

    await Addresses.update({
        isActual: 0,
    }, {
        where: {
            address_id: {
                [Op.ne]: data.addressId
            }
        }
    })
    await addressToUpdate.save();

    const addresses = await Addresses.findAll({});

    res.status(200).json({
        success: true,
        message: 'Адрес успешно обновлен',
        data: addresses,
        updatedAddressId: data.addressId
    });

})

router.post("/address/delete", authWebsite, async (req, res) => {

    const data = req.body;
    console.log('DATA ADDRESS DELETE', data);

    const addressToDelete = await Addresses.findOne({
        where: {
            address_id: data.addressId
        }
    })
    if (data.flag === 1) {
        await addressToDelete.update({
            deleted_at: data.flag,
        })
        await addressToDelete.save();
    }

    const addresses = await Addresses.findAll({
        where: {
            deleted_at: 0,
            client_id: req.userId,
        }
    });

    res.status(200).json({
        success: true,
        message: 'Адрес успешно удален',
        data: addresses
    });

})


export default router;
