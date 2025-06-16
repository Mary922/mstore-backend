import express from 'express';
import {Products, ProductSizes, ProductTags, Units} from "../../models/associations.js";
import {Tags} from "../../models/associations.js"
import {Categories, ProductCategories} from "../../models/associations.js";
import {Colors, ProductColors} from "../../models/associations.js";
import {Seasons} from "../../models/associations.js";
import {Sizes} from "../../models/associations.js";
import {Countries} from "../../models/associations.js";
import {Brands} from "../../models/associations.js";
import moment from "moment";
import {Prices} from "../../models/prices.js";
import {checkAuth} from "../../server/middleware/authCrm.js";
import {ProductImages} from "../../models/productImages.js";
import {sequelize} from "../../models/sequelize.js";
import {Op} from "sequelize";


const router = express.Router();


router.get("/products", checkAuth, async (req, res) => {
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
                attributes: ['size_id','size_name']
            },
            {
                model: Countries,
                attributes: ['country_id', 'country_name']
            },
            {
                model: Brands,
                attributes: ['brand_id', 'brand_name']
            }
        ],
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

router.get("/product", checkAuth, async (req, res) => {
    const data = req.query;
    console.log('DATA', data);


    const result = await Products.findOne({
        where: {
            deleted_at: null,
            product_id: data.productId
        },
        include: [{
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
                attributes: ['size_id','size_type', 'size_name']
            },
            {
                model: Countries,
                attributes: ['country_id', 'country_name']
            },
            {
                model: Brands,
                attributes: ['brand_id', 'brand_name']
            }
        ]
    })

    let date = new Date();
    let now = Math.round(new Date().getTime() / 1000);
    const currentTimestamp = Math.floor(date.getTime() / 1000);

    const prices = await Prices.findAll({
        where: {
            product_id: data.productId,
        }
    })

    const productPrice = await Prices.findOne({
        where: {
            product_id: data.productId,
            time_beginning: {
                [Op.lte]: currentTimestamp
            },
            [Op.or]: [
                {time_ending: null}
            ],
        },
        order: [['time_beginning', 'DESC']],
        limit: 1,
    })
    if (productPrice) {
        result.price = productPrice.price;
        await result.save();
    }

    if (result === null) {
        return res.json({
            success: false,
        })
    }
    res.json({
        success: true,
        data: {
            product: result,
            prices: prices,
            priceActual: productPrice
        }
    });
})

router.post("/product/update", checkAuth, async (req, res) => {
    try {
        const data = req.body;
        console.log('DATA', data);

        const product = await Products.getById(data.productId);
        product.product_name = data.productName;
        product.unit_id = data.productUnitId;
        product.season_id = data.productSeasonId;
        product.country_id = data.productCountryId;
        product.brand_id = data.productBrandId;
        product.gender_id = data.productGenderId;
        product.product_description = data.productDescription;
        await product.save();


        const tagsToDelete = await ProductTags.destroy({
            where: {
                product_id: data.productId
            }
        })

        await Products.createInBulk(data.productId,
            data.productTagsIds,
            'tag_id',
            ProductTags);

        const categoriesToDelete = await ProductCategories.destroy({
            where: {
                product_id: data.productId
            }
        })
        await Products.createInBulk(data.productId,
            data.productCategoriesIds,
            'category_id',
            ProductCategories)

        const colorsToDelete = await ProductColors.destroy({
            where: {
                product_id: data.productId
            }
        })
        await Products.createInBulk(data.productId,
            data.productColorsIds,
            'color_id',
            ProductColors)

        const sizesToDelete = await ProductSizes.destroy({
            where: {
                product_id: data.productId
            }
        })
        await Products.createInBulk(data.productId,
            data.productSizesIds,
            'size_id',
            ProductSizes)

        if (data.productPrice.price) {
            await Prices.createProductPrice(data.productPrice.product_id,
                data.productPrice.price,
                moment(data.productPrice.time_beginning).unix()
            )
        } else {

        }

        const existingImage = await ProductImages.findAll({
            where: {
                product_id: data.productId
            }
        })

        let ids = data.imageIds;
        if (!existingImage && product.product_id && ids.length > 0) {
            for (let i = 0; i < ids.length; i++) {
                const image = await ProductImages.create({
                    product_id: product.product_id,
                    image_id: ids[i],
                })
            }
        }

        if (product.product_id && ids.length > 0) {
            await ProductImages.destroy({
                where: {
                    product_id: data.productId,
                }
            })
            for (let i = 0; i < ids.length; i++) {
                const image = await ProductImages.create({
                    product_id: product.product_id,
                    image_id: ids[i],
                })
            }
        }

        if (product === null) {
            res.json({
                success: false,
            })
        }
        res.json({
            success: true,
        });

    } catch (error) {
        console.log(error);
    }
})


router.post("/product/new/create", checkAuth, async (req, res) => {
    const data = req.body;
    console.log('DATA', data);
    try {
        const result = await sequelize.transaction(async (t) => {

            const product = await Products.create({
                product_name: data.productName,
                price: data.price,
                unit_id: data.productUnitId,
                season_id: data.productSeasonId,
                country_id: data.productCountryId,
                brand_id: data.productBrandId,
                gender_id: data.productGenderId,
                product_description: data.productDescription,
                created_at: moment().unix(),
            }, {
                transaction: t
            });

            await Products.createInBulk(product.product_id,
                data.productTagsIds,
                'tag_id',
                ProductTags,
                t
            );

            await Products.createInBulk(product.product_id,
                data.productCategoriesIds,
                'category_id',
                ProductCategories,
                t
            );

            await Products.createInBulk(product.product_id,
                data.productColorsIds,
                'color_id',
                ProductColors,
                t
            )

            await Products.createInBulk(product.product_id,
                data.productSizesIds,
                'size_id',
                ProductSizes,
                t
            )

            await Prices.create({
                product_id: product.product_id,
                price: data.price,
                time_beginning: moment().unix(),
            }, {
                transaction: t
            })

            let ids = data.imageIds;
            if (product.product_id && ids.length > 0) {
                for (let i = 0; i < ids.length; i++) {
                    const image = await ProductImages.create({
                        product_id: product.product_id,
                        image_id: ids[i],
                    }, {transaction: t})
                }
            }


        })

        res.json({
            success: true,
        });

    } catch (error) {
        console.log(error);
    }
})


export default router;