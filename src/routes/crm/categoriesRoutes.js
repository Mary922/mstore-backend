import express from 'express';
import {Categories} from "../../models/categories.js";
import moment from "moment/moment.js";
import {GENDER} from "../../server/views/constants.js";
import {checkAuth} from "../../server/middleware/authCrm.js";
import {sequelize} from "../../models/sequelize.js";
import {Op} from "sequelize";


const router = express.Router();

router.get("/categories", checkAuth,async (req, res) => {

    const data = req.query;
    console.log('DATA', data);

    const result = await Categories.findAll({
        where: {
            deleted_at: null
        }
    })
    console.log('RES', result)

    if (result === null) {
        res.json({
            success: false,
        })
    }
    res.json({
        success: true,
        data: result
    });
})

router.get("/categories/gender/male",async (req, res) => {
    const data = req.query;
    console.log('DATA', data);

    const result = await Categories.findAll({
        where: {
            deleted_at: null,
            gender: 'м'
        }
    })
    console.log('RES', result)

    if (result === null) {
        res.json({
            success: false,
        })
    }
    res.json({
        success: true,
        data: result
    });
})




router.post("/categories/create", checkAuth,async (req, res) => {
    const data = req.body;
    console.log('DATA', data);

    const result = await Categories.create({
        category_name: data.categoryName,
        gender: data.gender,
        parent_id: data.parentId,
    })
    console.log('RES', result)

    if (result === null) {
        res.json({
            success: false,
        })
    }
    res.json({
        success: true,
    });
})

router.post("/categories/update",checkAuth, async (req, res) => {
    const data = req.body;
    console.log('DATA', data);

    const result = await Categories.update({
        category_name: data.categoryName,
        gender: data.gender,
        parent_id: data.parentId,
    }, {
        where: {
            category_id: data.categoryId
        }
    })
    console.log('RES', result)

    if (result === null) {
        res.json({
            success: false,
        })
    }
    res.json({
        success: true,
        data: result
    });
})


router.post("/categories/delete", checkAuth,async (req, res) => {
    const data = req.body;
    console.log('DATA', data);

    const result = await Categories.update({
        deleted_at: moment().unix(),
    }, {
        where: {
            category_id: data.categoryId
        }
    })
    console.log('RES', result)

    if (result === null) {
        res.json({
            success: false,
        })
    }
    res.json({
        success: true,
        data: result
    });
})


// router.get("/categories/parents/get", checkAuth,async (req, res) => {
//
//     const data = req.query;
//     console.log('DATA', data);
//
//     const categoriesWithParents = await Categories.findAll({
//         where: {
//             parent_id: {
//                 [Op.not]: null // Ищем все категории, у которых есть родитель
//             }
//         },
//         include: [{
//             model: Categories,
//             as: 'parent', // Указываем ассоциацию
//             attributes: ['parent_id', 'category_name'] // Выбираем только нужные поля родителя
//         }],
//         raw: true // Для простого объекта (не экземпляра модели)
//     });
//
//     // const result = await Categories.findAll({
//     //     where: {
//     //         deleted_at: null,
//     //         parent_id: true
//     //     }
//     // })
//     // console.log('RES', result)
//     //
//     // if (result === null) {
//     //     res.json({
//     //         success: false,
//     //     })
//     // }
//
//     res.json({
//         success: true,
//         data: categoriesWithParents
//     });
// })


export default router;