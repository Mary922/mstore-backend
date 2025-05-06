// import express from "express";
// import {Images} from "../../models/images.js";
// import {ProductImages} from "../../models/productImages.js";
//
// const router = express.Router();
//
//
// router.post("/image/get", async (req, res) => {
//     const data = req.body;
//     console.log('DATA', data);
//
//
//     // const result = await ProductImages.findOne({
//     //     where: {
//     //         product_id: data.productId,
//     //     }
//     // })
//     // console.log('RES', result)
//
//     // let path = '';
//     // if (result) {
//     //     const image = await Images.findAll({
//     //         where: {
//     //             image_id: result.image_id
//     //         }
//     //     })
//     //     if (image) {
//     //         path = image.image_path
//     //     } else {
//     //         console.log('No image')
//     //     }
//     // }
//     //
//     //
//     // if (result === null) {
//     //     return res.json({
//     //         success: false,
//     //     })
//     // }
//     // return res.json({
//     //     success: true,
//     //     data: path
//     // });
// })
// export default router;