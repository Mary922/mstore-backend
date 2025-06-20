import express from "express";
import {Images, ProductCategories, Products} from "../../models/associations.js";

const router = express.Router();

router.get('/productCategories',async (req, res) => {
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
        },
        order: [['product_name', 'ASC']],
        include: [
            {
                model: Images,
                attributes: ['image_id', 'image_path'],
            }
        ]
    })

    if (productCategories === null) {
        res.json({
            success: false,
        })
    }
    res.json({
        success: true,
        data: products
    });
})

export default router;