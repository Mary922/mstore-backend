import express from "express";
import {Regions} from "../../models/regions.js";

const router = express.Router();

router.get("/regions", async (req, res) => {

    const data = req.query;
    console.log('DATA', data);

    const result = await Regions.findAll({})


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
