import express from "express";
import {Tags} from "../../models/tags.js";
import moment from "moment";
import {checkAuth} from "../../server/middleware/authCrm.js";

const router = express.Router();

router.get("/tags", checkAuth,async (req, res) => {
    const data = req.query;
    console.log('DATA', data);

    const result = await Tags.findAll({
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

router.post("/tags/create", checkAuth,async (req, res) => {
    const data = req.body;
    console.log('DATA', data);

    const result = await Tags.create({
        tag_name: data.tagName,
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

router.post("/tags/update", checkAuth,async (req, res) => {
    const data = req.body;
    console.log('DATA', data);

    const result = await Tags.update({
        tag_name: data.tagName,
    }, {
        where: {
            tag_id: data.tagId
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


router.post("/tags/delete",checkAuth, async (req, res) => {
    const data = req.body;
    console.log('DATA', data);

    const result = await Tags.update({
        deleted_at: moment().unix(),
    }, {
        where: {
            tag_id: data.tagId
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
export default router;