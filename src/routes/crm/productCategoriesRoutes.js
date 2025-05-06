import express from "express";
import {Images, ProductCategories, ProductImages, Products} from "../../models/associations.js";
import {checkAuth} from "../../server/middleware/authCrm.js";

const router = express.Router();

router.get('/crm/productCategories', checkAuth, async (req, res) => {
    const data = req.query;
    console.log('DATA', data);

    const productCategories = await ProductCategories.findAll({
        where: {
            category_id: data.categoryId
        }
    })

    let productIds = [];
    for (let i = 0; i < productCategories.length; i++) {
        productIds.push(productCategories[i].product_id);
    }

    const products = await Products.findAll({
        where: {
            product_id: productIds
        }
    });

    console.log(products);

    if (productCategories === null) {
       return res.json({
            success: false,
        })
    }
    res.json({
        success: true,
        data: products
    });
})

export default router;