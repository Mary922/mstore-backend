import express from "express";
import {Regions} from "../../models/regions.js";
import {Cities} from "../../models/cities.js";

const router = express.Router();

router.post("/cities", async (req, res) => {

    const data = req.body;
    console.log('DATA', data);

    const result = await Cities.findAll({
        where: {
            region_id: data.regionId,
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
