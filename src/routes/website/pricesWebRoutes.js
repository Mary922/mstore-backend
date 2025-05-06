import express from "express";
import {Prices} from "../../models/prices.js";
import {sequelize} from "../../models/sequelize.js";

const router = express.Router();

router.get("/prices/max", async (req, res) => {
    const data = req.query;
    console.log('DATA MAX PRICES', data);

    const result = await Prices.findOne({
        attributes: [
            [sequelize.fn('MAX', sequelize.col('price')), 'maxPrice']
        ]
    });

    console.log('MAX MAX MAX', result)


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