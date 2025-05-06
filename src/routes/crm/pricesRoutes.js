import express from 'express';
import {Prices} from "../../models/prices.js";
import {checkAuth} from "../../server/middleware/authCrm.js";
const router = express.Router();

router.get('/prices/get',checkAuth, async (req, res) => {
    const data = req.query;
    console.log('DATA',data);

    const  result = await Prices.findAll({})
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