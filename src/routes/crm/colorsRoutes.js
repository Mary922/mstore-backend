import express from "express";
import {Colors} from "../../models/colors.js";
import moment from "moment";
import {checkAuth} from "../../server/middleware/authCrm.js";

const router = express.Router();

router.get("/colors", checkAuth,async (req, res) => {
    const data = req.query;
    console.log('DATA', data);

    const result = await Colors.findAll({
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

router.post("/colors/create", checkAuth,async (req, res) => {
    const data = req.body;
    console.log('DATA', data);

    const result = await Colors.create({
        color_name: data.colorName,
        color_rgb: data.colorRGB,
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

router.post("/colors/update", checkAuth,async (req, res) => {
    const data = req.body;
    console.log('DATA', data);

    const result = await Colors.update({
        color_name: data.colorName,
        color_rgb: data.colorRGB,
    }, {
        where: {
            color_id: data.colorId
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


router.post("/colors/delete",checkAuth, async (req, res) => {
    const data = req.body;
    console.log('DATA', data);

    const result = await Colors.update({
        deleted_at: moment().unix(),
    }, {
        where: {
            color_id: data.colorId
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