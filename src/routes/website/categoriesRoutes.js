import express from "express";
import {Categories} from "../../models/categories.js";
import {GENDER} from "../../server/views/constants.js";

const router = express.Router();

router.get("/categories/gender",async (req, res) => {
    const data = req.query;
    console.log('DATA', data);

    const categories = await Categories.findAll({
        where: {
            deleted_at: null,
        },
        order: [['order_index', 'ASC']]
    })

    let male = [];
    let female = [];
    for (let i =0; i< categories.length; i++) {
        if (categories[i].gender == GENDER.MALE) {
            male.push(categories[i])
        }
        if (categories[i].gender == GENDER.FEMALE) {
            female.push(categories[i])
        }
    }


    res.json({
        success: true,
        data: {
            male,
            female
        }
    });
})
export default router;