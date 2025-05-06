import express from "express";
import {Gender} from "../../models/gender.js";
import {checkAuth} from "../../server/middleware/authCrm.js";

const router = express.Router();

router.get("/gender/get", checkAuth,async (req, res) => {
    const data = req.query;
    console.log('DATA',data);

    const  result = await Gender.findAll({})
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