import express from "express";
import {authWebsite} from "../../server/middleware/authWebsite.js";
import {Wishlist} from "../../models/wishlist.js";
import moment from "moment";
import {Products} from "../../models/associations.js";

const router = express.Router();


router.get("/wishlist/get", authWebsite, async (req, res) => {
    try {
        const data = req.query;
        console.log('DATA', data);

        const result = await Wishlist.findAll({
            where: {
                client_id: req.userId,
            }
        })

        if (result === null) {
            res.json({
                success: false,
            })
        }
        res.json({
            success: true,
            data: result
        });
    }   catch (e) {
        console.log(e);
    }
})


router.post("/wishlist/getProducts", authWebsite, async (req, res) => {
    try {
        const data = req.body;
        console.log('DATA WISHLIST IDS', data);

        const result = await Products.getByIds(data.ids)

        if (result === null) {
            res.json({
                success: false,
            })
        }
        res.json({
            success: true,
            data: result
        });
    }   catch (e) {
        console.log(e);
    }
})

router.post("/wishlist/update", authWebsite, async (req, res) => {
    try {
        const data = req.body;
        console.log('DATA', data);

        const result = await Wishlist.create({
                client_id: req.userId,
                product_id: data.wishlist,
                created_at: moment().unix(),
            }
        )
        console.log('RES', result);

        const allWishlist = await Wishlist.findAll({
            where: {
                client_id: req.userId,
            }
        })
        console.log('allwish',allWishlist)


        if (result === null) {
            res.json({
                success: false,
            })
        }
        res.json({
            success: true,
            data: allWishlist
        });
    }   catch (e) {
        res.status(200).json({
            message: 'Already exist in wishlist'
        })
    }




})


router.post("/wishlist/delete", authWebsite, async (req, res) => {

    const data = req.body;
    console.log('DATA', data);
    // console.log('wishlist', data.wishlist);
    // console.log('USER ID', req.userId);


    const productToDelete = await Wishlist.destroy({
        where: {
            // client_id: req.userId,
            product_id: data.wishlist
        }
    })

    const allWishlist = await Wishlist.findAll({
        where: {
            client_id: req.userId,
        }
    })


    // if (result === null) {
    //     res.json({
    //         success: false,
    //     })
    // }


    res.json({
        success: true,
        data: allWishlist
    });
})

export default router;