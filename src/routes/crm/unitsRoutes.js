import express from "express";
import {Units} from "../../models/units.js";
import {checkAuth} from "../../server/middleware/authCrm.js";

const router = express.Router();

router.get("/units/get", checkAuth, async (req, res) => {
    const data = req.query;
    console.log('DATA',data);

    const  result = await Units.findAll({})

    if(result === null){
        res.json({
            success: false,
        })
    }
    res.json({
        success: true,
        data: result
    });
})


router.post("/units/create", checkAuth,async (req, res) => {
    const data = req.body;
    console.log('DATA', data);

    const result = await Units.create({
        unit_name: data.unitName,
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

router.post("/units/update", checkAuth, async (req, res) => {
    const data = req.body;
    console.log('DATA', data);

    const result = await Units.update({
        unit_name: data.unitName,
    }, {
        where: {
            unit_id: data.unitId
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