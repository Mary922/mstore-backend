import express from "express";
import {Seasons} from "../../models/seasons.js";
import {checkAuth} from "../../server/middleware/authCrm.js";

const router = express.Router();

router.get("/seasons/get", checkAuth,async (req, res) => {
    const data = req.query;
    console.log('DATA',data);

    const  result = await Seasons.findAll({})
    console.log('RES',result)

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
export default router;