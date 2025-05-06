import express from "express";
import {Sizes} from "../../models/sizes.js";
import {checkAuth} from "../../server/middleware/authCrm.js";

const router = express.Router();

router.get("/sizes/get", checkAuth, async (req, res) => {
    const data = req.query;
    console.log('DATA',data);

    const  result = await Sizes.findAll({
        where: {
            deleted_at: null
        }
    })
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