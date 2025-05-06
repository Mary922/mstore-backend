import express from "express";
import {Products} from "../../models/products.js";
import {Tags} from "../../models/tags.js";
import {Categories} from "../../models/categories.js";
import {Colors} from "../../models/colors.js";
import {Units} from "../../models/units.js";
import {Seasons} from "../../models/seasons.js";
import {Sizes} from "../../models/sizes.js";
import {Countries} from "../../models/countries.js";
import {Brands} from "../../models/brands.js";
import {Images} from "../../models/images.js";
import {Op} from "sequelize";
import {ProductImages} from "../../models/associations.js";


const router = express.Router();


router.get("/products/get", async (req, res) => {

    const data = req.query;
    console.log('DATA', data);

    const result = await Products.findAll({
        where: {
            deleted_at: null
        },
        include: [
            {
                model: Tags,
                attributes: ['tag_id', 'tag_name']
            },
            {
                model: Categories,
                attributes: ['category_id', 'category_name']
            },
            {
                model: Colors,
                attributes: ['color_id', 'color_name']
            },
            {
                model: Units,
                attributes: ['unit_id', 'unit_name']
            },
            {
                model: Seasons,
                attributes: ['season_id', 'season_name']
            },
            {
                model: Sizes,
                attributes: ['size_id', 'size_name']
            },
            {
                model: Countries,
                attributes: ['country_id', 'country_name']
            },
            {
                model: Brands,
                attributes: ['brand_id', 'brand_name']
            },
            {
                model: Images,
                attributes: ['image_id', 'image_path'],
            },
        ]
    });

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

router.post("/products/cart", async (req, res) => {

    const data = req.body;
    console.log('DATA', data);
    const result = await Products.getByIds(data.ids);

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

router.get("/product/get", async (req, res) => {

    const data = req.query;
    console.log('DATA PRODUCT ID', data);


    const result = await Products.findOne({
        where: {
            product_id: data.productId,
            deleted_at: null,
        },
        include: [
            {
                model: Tags,
                attributes: ['tag_id', 'tag_name']
            },
            {
                model: Categories,
                attributes: ['category_id', 'category_name']
            },
            {
                model: Colors,
                attributes: ['color_id', 'color_name']
            },
            {
                model: Units,
                attributes: ['unit_id', 'unit_name']
            },
            {
                model: Seasons,
                attributes: ['season_id', 'season_name']
            },
            {
                model: Sizes,
                attributes: ['size_id', 'size_name']
            },
            {
                model: Countries,
                attributes: ['country_id', 'country_name']
            },
            {
                model: Brands,
                attributes: ['brand_id', 'brand_name']
            },
            {
                model: Images,
                attributes: ['image_id', 'image_path'],
            },
        ]
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
})


router.get("/products/search", async (req, res) => {

    const data = req.query;
    console.log('DATA search val', data);

    let result;
    if (data.searchValue) {
        result = await Products.findAll({
            where: {
                product_name: {
                    [Op.like]: `%${data.searchValue}%`
                },
                deleted_at: null,
            },
            include: [
                {
                    model: Tags,
                    attributes: ['tag_id', 'tag_name']
                },
                {
                    model: Categories,
                    attributes: ['category_id', 'category_name']
                },
                {
                    model: Colors,
                    attributes: ['color_id', 'color_name']
                },
                {
                    model: Units,
                    attributes: ['unit_id', 'unit_name']
                },
                {
                    model: Seasons,
                    attributes: ['season_id', 'season_name']
                },
                {
                    model: Sizes,
                    attributes: ['size_id', 'size_name']
                },
                {
                    model: Countries,
                    attributes: ['country_id', 'country_name']
                },
                {
                    model: Brands,
                    attributes: ['brand_id', 'brand_name']
                },
                {
                    model: Images,
                    attributes: ['image_id', 'image_path'],
                },
            ]
        })
    }


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


router.get("/boys", async (req, res) => {

    const data = req.query;
    console.log('DATA', data);

    const result = await Products.findAll({
        where: {
            deleted_at: null,
            gender_id: 1
        },
        include: [
            {
                model: Tags,
                attributes: ['tag_id', 'tag_name']
            },
            {
                model: Categories,
                attributes: ['category_id', 'category_name']
            },
            {
                model: Colors,
                attributes: ['color_id', 'color_name']
            },
            {
                model: Units,
                attributes: ['unit_id', 'unit_name']
            },
            {
                model: Seasons,
                attributes: ['season_id', 'season_name']
            },
            {
                model: Sizes,
                attributes: ['size_id', 'size_name']
            },
            {
                model: Countries,
                attributes: ['country_id', 'country_name']
            },
            {
                model: Brands,
                attributes: ['brand_id', 'brand_name']
            },
            {
                model: Images,
                attributes: ['image_id', 'image_path'],
                through: {
                    attributes: ['order_index'], // Добавляем поле order_index из ProductImages
                },
                order: [[ProductImages, 'order_index', 'ASC']],
            },
        ]
    });

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


router.get("/girls", async (req, res) => {

    const data = req.query;
    console.log('DATA', data);

    const result = await Products.findAll({
        where: {
            deleted_at: null,
            gender_id: 2
        },
        include: [
            {
                model: Tags,
                attributes: ['tag_id', 'tag_name']
            },
            {
                model: Categories,
                attributes: ['category_id', 'category_name']
            },
            {
                model: Colors,
                attributes: ['color_id', 'color_name']
            },
            {
                model: Units,
                attributes: ['unit_id', 'unit_name']
            },
            {
                model: Seasons,
                attributes: ['season_id', 'season_name']
            },
            {
                model: Sizes,
                attributes: ['size_id', 'size_name']
            },
            {
                model: Countries,
                attributes: ['country_id', 'country_name']
            },
            {
                model: Brands,
                attributes: ['brand_id', 'brand_name']
            },
            {
                model: Images,
                attributes: ['image_id', 'image_path'],
                through: {
                    attributes: ['order_index'], // Добавляем поле order_index из ProductImages
                },
                order: [[ProductImages, 'order_index', 'ASC']],
            },
        ]
    });

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


router.get("/babies", async (req, res) => {

    const data = req.query;
    console.log('DATA', data);

    const result = await Products.findAll({
        where: {
            deleted_at: null,
            gender_id: 2
        },
        include: [
            {
                model: Tags,
                attributes: ['tag_id', 'tag_name']
            },
            {
                model: Categories,
                attributes: ['category_id', 'category_name']
            },
            {
                model: Colors,
                attributes: ['color_id', 'color_name']
            },
            {
                model: Units,
                attributes: ['unit_id', 'unit_name']
            },
            {
                model: Seasons,
                attributes: ['season_id', 'season_name']
            },
            {
                model: Sizes,
                attributes: ['size_id', 'size_name'],
                where: {
                    size_name: {
                        [Op.gte]: 50,
                        [Op.lte]: 98,
                    }
                }
            },
            {
                model: Countries,
                attributes: ['country_id', 'country_name']
            },
            {
                model: Brands,
                attributes: ['brand_id', 'brand_name']
            },
            {
                model: Images,
                attributes: ['image_id', 'image_path'],
                // through: {
                //     attributes: ['order_index'], // Добавляем поле order_index из ProductImages
                // },
                // order: [[ProductImages, 'order_index', 'ASC']],
            },
        ]
    });

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


router.post("/products/filter", async (req, res) => {

    const data = req.body;
    console.log('DATA filter val', data);

    // let result;
    // if (data.searchValue) {
    //     result = await Products.findAll({
    //         where: {
    //             product_name: {
    //                 [Op.like]: `%${data.searchValue}%`
    //             },
    //             deleted_at: null,
    //         },
    //         include: [
    //             {
    //                 model: Tags,
    //                 attributes: ['tag_id', 'tag_name']
    //             },
    //             {
    //                 model: Categories,
    //                 attributes: ['category_id', 'category_name']
    //             },
    //             {
    //                 model: Colors,
    //                 attributes: ['color_id', 'color_name']
    //             },
    //             {
    //                 model: Units,
    //                 attributes: ['unit_id', 'unit_name']
    //             },
    //             {
    //                 model: Seasons,
    //                 attributes: ['season_id', 'season_name']
    //             },
    //             {
    //                 model: Sizes,
    //                 attributes: ['size_id', 'size_by_height']
    //             },
    //             {
    //                 model: Countries,
    //                 attributes: ['country_id', 'country_name']
    //             },
    //             {
    //                 model: Brands,
    //                 attributes: ['brand_id', 'brand_name']
    //             },
    //             {
    //                 model: Images,
    //                 attributes: ['image_id', 'image_path'],
    //             },
    //         ]
    //     })
    // }
    //
    //
    // if (result === null) {
    //     res.json({
    //         success: false,
    //     })
    // }
    // res.json({
    //     success: true,
    //     data: result
    // });
})

export default router;