import express from "express";
import {Brands} from "../../models/brands.js";
import {checkAuth} from "../../server/middleware/authCrm.js";

const router = express.Router();

router.get("/brands/get",checkAuth, async (req, res) => {
    const data = req.query;
    console.log('DATA',data);

    const  result = await Brands.findAll({})
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


router.post("/brands/create", checkAuth,async (req, res) => {
    const data = req.body;
    console.log('DATA', data);

    const result = await Brands.create({
        brand_name: data.brandName,
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

router.post("/brands/update", checkAuth,async (req, res) => {
    const data = req.body;
    console.log('DATA', data);

    const result = await Brands.update({
        brand_name: data.brandName,
    }, {
        where: {
            brand_id: data.brandId
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