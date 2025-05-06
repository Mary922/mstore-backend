import express from "express";
import {Images} from "../../models/images.js";
import {ProductImages} from "../../models/productImages.js";
import {Products} from "../../models/associations.js";
import {ImagesStatic} from "../../models/imagesStatic.js";

const router = express.Router();


router.post("/images/get", async (req, res) => {
    const data = req.body;
    console.log('DATA IMAGE GET', data);


    const result = await Products.findAll({
        where: {
            product_id: data.productIds,
        },
        include: [
            {
                model: Images,
                attributes: ['image_id', 'image_path'],
            }
        ]
    })
    console.log('RES', result)

    // let path = '';
    // if (result) {
    //     const image = await Images.findAll({
    //         where: {
    //             image_id: result.image_id
    //         }
    //     })
    //     if (image) {
    //         path = image.image_path
    //     } else {
    //         console.log('No image')
    //     }
    // }
    //
    //
    if (result === null) {
        return res.json({
            success: false,
        })
    }
    return res.json({
        success: true,
        data: result
    });
})

router.post("/images/get/static", async (req, res) => {
    const data = req.body;
    console.log('DATA IMAGES GET STATIC', data);


    const result = await ImagesStatic.findAll({
        where: {
            type: data.type,
            image_destination: data.destination,
        }
    })
    console.log('RES', result)

    // let path = '';
    // if (result) {
    //     const image = await Images.findAll({
    //         where: {
    //             image_id: result.image_id
    //         }
    //     })
    //     if (image) {
    //         path = image.image_path
    //     } else {
    //         console.log('No image')
    //     }
    // }
    //
    //

    if (result === null) {
        return res.json({
            success: false,
        })
    }
    return res.json({
        success: true,
        data: result
    });
})

export default router;