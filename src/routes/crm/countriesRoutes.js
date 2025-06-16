import express from "express";
import {Countries} from "../../models/countries.js";
import {checkAuth} from "../../server/middleware/authCrm.js";

const router = express.Router();

router.get("/countries/get",checkAuth, async (req, res) => {
    const data = req.query;
    console.log('DATA',data);

    const  result = await Countries.findAll({})

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