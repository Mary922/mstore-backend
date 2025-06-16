import express from 'express';
import {Categories} from "../../models/categories.js";
import moment from "moment/moment.js";
import {checkAuth} from "../../server/middleware/authCrm.js";


const router = express.Router();

router.get("/categories", checkAuth,async (req, res) => {

    const data = req.query;
    console.log('DATA', data);

    const result = await Categories.findAll({
        where: {
            deleted_at: null
        }
    })

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

export default router;