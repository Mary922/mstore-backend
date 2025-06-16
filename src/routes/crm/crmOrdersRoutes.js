import express from "express";
import {checkAuth} from "../../server/middleware/authCrm.js";
import {Cities, Orders, Regions} from "../../models/associations.js";


const router = express.Router();

router.get("/orders/crm",checkAuth,async (req, res) => {

    const data = req.query;
    console.log('DATA', data);

    const result = await Orders.findAll({
        include: [
            {
                model: Cities,
                attributes: ['region_id','city_id', 'city_name'],
                include: [{
                    model: Regions,
                    attributes: ['region_id','region_name'],
                }]
            },
        ]
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